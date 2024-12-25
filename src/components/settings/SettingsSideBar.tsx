import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import BranchSettings from './BranchSettings';
import SidebarComponentProps from '../../infrastructure/props/SidebarComponentProps';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../infrastructure/store/store';
import { useState, useEffect } from 'react';
import { removeApiSettings, addApiSettings } from '../../infrastructure/store/slices/File/ApiSettings-Slice';
import { removeBranchList, addBranchList } from '../../infrastructure/store/slices/File/SelectedBranchList-Slice';
import Header from './SettingsHeader';
import { StyledDrawer } from './SettingsStyle';
import Cookies from 'js-cookie';
import { addSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { setFeatureCount } from '../../infrastructure/store/slices/File/FeatureCount-Slice';
import { setSelectedItems } from '../../infrastructure/store/slices/File/SelectedSearchedItem-Slice';
import { setDarkMode } from '../../infrastructure/store/slices/GeneralSettings/Theme-Slice';


    const SidebarComponent: React.FC<SidebarComponentProps> = ({ visible, onHide }) => {
      const dispatch = useDispatch();
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
        return savedBranches ? JSON.parse(savedBranches) : ['dev', 'stable', 'stage', 'prod'];
      });
      const [selectedProjects] = useState<JobDto[]>(() => {
        const savedProjects = Cookies.get('selectedProjects');
        return savedProjects ? JSON.parse(savedProjects) : [];
      });
      const featureCount = useSelector((state: RootState) => state.getFeatureCount.count);
      const selectedSearchedItems = useSelector((state: RootState) => state.getSearchedItems.selectedItems);
    
      useEffect(() => {
        selectedSettings.forEach(setting => {
          dispatch(removeApiSettings(setting));
        });
        selectedBranches.forEach(branch => {
          dispatch(removeBranchList(branch));
        });
        
        selectedSettings.forEach(setting => {
          dispatch(addApiSettings(setting));
        });
        
        selectedBranches.forEach(branch => {
          dispatch(addBranchList(branch));
        });
      }, [dispatch, selectedSettings, selectedBranches]);
    
      useEffect(() => {
        Cookies.set('darkMode', String(isDarkMode), { expires: 30 });
        document.body.classList.toggle('dark-mode', isDarkMode);
      }, [isDarkMode]);
    
      useEffect(() => {
        Cookies.set('selectedSettings', JSON.stringify(selectedSettings), { expires: 30 });
      }, [selectedSettings]);
    
      useEffect(() => {
        Cookies.set('selectedBranches', JSON.stringify(selectedBranches), { expires: 30 });
      }, [selectedBranches]);
    
      useEffect(() => {
        Cookies.set('selectedProjects', JSON.stringify(selectedProjects), { expires: 30 });
      }, [selectedProjects]);
    
      useEffect(() => {
        const savedProjects = Cookies.get('selectedProjects');
        if (savedProjects) {
          const projects = JSON.parse(savedProjects);
          projects.forEach((project: JobDto) => {
            dispatch(addSelectedProject(project));
          });
        }
      }, []);
    
      useEffect(() => {
        const savedFeatureCount = Cookies.get('featureCount');
        if (savedFeatureCount) {
          dispatch(setFeatureCount(parseInt(savedFeatureCount)));
        } else {
          dispatch(setFeatureCount(3)); 
        }
      }, []);
    
      useEffect(() => {
        Cookies.set('featureCount', String(featureCount), { expires: 30 });
      }, [featureCount]);
    
      useEffect(() => {
        const savedSearchedItems = Cookies.get('selectedSearchedItems');
        if (savedSearchedItems) {
          dispatch(setSelectedItems(JSON.parse(savedSearchedItems)));
        }
      }, []);
    
      useEffect(() => {
        Cookies.set('selectedSearchedItems', JSON.stringify(selectedSearchedItems), { expires: 30 });
      }, [selectedSearchedItems]);
    
      useEffect(() => {
        const savedMode = Cookies.get('darkMode');
        const initialDarkMode = savedMode === 'true';
        dispatch(setDarkMode(initialDarkMode));
      }, []);
    
      const handleSettingChange = (settingKey: string, checked: boolean) => {
        const newSelectedSettings = checked
          ? [...selectedSettings, settingKey]
          : selectedSettings.filter(item => item !== settingKey);
        
        setSelectedSettings(newSelectedSettings);
        dispatch(checked ? addApiSettings(settingKey) : removeApiSettings(settingKey));
      };
    
      const handleBranchChange = (branchKey: string, checked: boolean) => {
        const newSelectedBranches = checked
          ? [...selectedBranches, branchKey]
          : selectedBranches.filter(item => item !== branchKey);
        
        setSelectedBranches(newSelectedBranches);
        dispatch(checked ? addBranchList(branchKey) : removeBranchList(branchKey));
      };
    
      const handleThemeChange = (checked: boolean) => {
        setIsDarkMode(checked);
        dispatch(setDarkMode(checked));
        Cookies.set('darkMode', String(checked), { expires: 30 });
        document.body.classList.toggle('dark-mode', checked);
      };
    
      return (
        <StyledDrawer anchor="right" open={visible} onClose={onHide}>
          <Header onHide={onHide} />
          <GeneralSettings 
            isDarkMode={isDarkMode} 
            onThemeChange={handleThemeChange} 
          />
          <ApiSettings 
            selectedSettings={selectedSettings} 
            handleSettingChange={handleSettingChange} 
          />
          <BranchSettings 
            selectedBranches={selectedBranches} 
            handleBranchChange={handleBranchChange} 
          />
        </StyledDrawer>
      );
    };
    
    export default SidebarComponent;