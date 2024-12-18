import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import BranchSettings from './BranchSettings';
import SidebarComponentProps from '../../infrastructure/props/SidebarComponentProps';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../infrastructure/store/store';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import { removeApiSettings, addApiSettings } from '../../infrastructure/store/slices/File/ApiSettings-Slice';
import { removeBranchList, addBranchList } from '../../infrastructure/store/slices/File/SelectedBranchList-Slice';
import Header from './SettingsHeader';
import { StyledDrawer } from './SettingsStyle';
import Cookies from 'js-cookie';


    const SidebarComponent: React.FC<SidebarComponentProps> = ({ visible, onHide }) => {
      const dispatch = useDispatch<AppDispatch>();
      const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedMode = Cookies.get('darkMode');
        return savedMode === 'true';
      });
      const [selectedSettings, setSelectedSettings] = useState<string[]>(() => {
        const savedSettings = Cookies.get('selectedSettings');
        return savedSettings ? JSON.parse(savedSettings) : [];
      });
      const [selectedBranches, setSelectedBranches] = useState<string[]>(() => {
        const savedBranches = Cookies.get('selectedBranches');
        return savedBranches ? JSON.parse(savedBranches) : [];
      });
      const [featureCount, setFeatureCount] = useState<number>(() => {
        const savedCount = Cookies.get('featureCount');
        return savedCount ? parseInt(savedCount) : 3;
      });
    
      useEffect(() => {
        selectedSettings.forEach(setting => {
          dispatch(removeApiSettings(setting));
        });
        selectedBranches.forEach(branch => {
          dispatch(removeBranchList(branch));
        });
        
        const basicSettings = selectedSettings.filter(setting => !setting.includes('builds['));
        basicSettings.forEach(setting => {
          dispatch(addApiSettings(setting));
        });
        
        selectedBranches.forEach(branch => {
          dispatch(addBranchList(branch));
        });
        
        if (selectedBranches.includes('feature')) {
          const buildSetting = `builds[number,url,status,timestamp,result,duration]{,${featureCount}}`;
          dispatch(addApiSettings(buildSetting));
        }
      }, [dispatch, selectedSettings, selectedBranches, featureCount]);
    
      useEffect(() => {
        Cookies.set('darkMode', String(isDarkMode), { expires: 30 });
        document.body.classList.toggle('dark-mode', isDarkMode);
      }, [isDarkMode]);
    
      useEffect(() => {
        const settingsToSave = selectedSettings.filter(setting => !setting.includes('builds['));
        Cookies.set('selectedSettings', JSON.stringify(settingsToSave), { expires: 30 });
      }, [selectedSettings]);
    
      useEffect(() => {
        Cookies.set('selectedBranches', JSON.stringify(selectedBranches), { expires: 30 });
      }, [selectedBranches]);
    
      useEffect(() => {
        Cookies.set('featureCount', String(featureCount), { expires: 30 });
      }, [featureCount]);
    
      const handleSettingChange = (settingKey: string, checked: boolean) => {
        const newSelectedSettings = checked
          ? [...selectedSettings, settingKey]
          : selectedSettings.filter(item => item !== settingKey);
        
        setSelectedSettings(newSelectedSettings);
        dispatch(checked ? addApiSettings(settingKey) : removeApiSettings(settingKey));
      };
    
      const handleBranchChange = (branchKey: string, checked: boolean) => {
        if (branchKey.includes('builds[')) {
          if (checked) {
            dispatch(addApiSettings(branchKey));
          } else {
            dispatch(removeApiSettings(branchKey));
          }
          return;
        }
    
        const newSelectedBranches = checked
          ? [...selectedBranches, branchKey]
          : selectedBranches.filter(item => item !== branchKey);
        
        setSelectedBranches(newSelectedBranches);
        dispatch(checked ? addBranchList(branchKey) : removeBranchList(branchKey));
      };
    
      return (
        <StyledDrawer anchor="right" open={visible} onClose={onHide}>
          <Header onHide={onHide} />
          <GeneralSettings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <ApiSettings 
            selectedSettings={selectedSettings} 
            handleSettingChange={handleSettingChange} 
          />
          <BranchSettings 
            selectedBranches={selectedBranches} 
            handleBranchChange={handleBranchChange} 
            featureCount={featureCount}
            setFeatureCount={setFeatureCount}
          />
        </StyledDrawer>
      );
    };
    
    export default SidebarComponent;