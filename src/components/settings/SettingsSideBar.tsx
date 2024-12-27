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
import { setDarkMode, setThemeVariant } from '../../infrastructure/store/slices/GeneralSettings/Theme-Slice';
import { setFolderColor } from '../../infrastructure/store/slices/GeneralSettings/FolderColor-Slice';
import { ThemeVariant } from '../../theme/theme';


    const SidebarComponent: React.FC<SidebarComponentProps> = ({ visible, onHide }) => {
      const dispatch = useDispatch();
      const themeState = useSelector((state: RootState) => state.theme);
      const folderColor = useSelector((state: RootState) => state.folderColor.color);
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
    
      useEffect(() => {
        const updateCookies = () => {
          Cookies.set('selectedSettings', JSON.stringify(selectedSettings), { expires: 30 });
          Cookies.set('selectedBranches', JSON.stringify(selectedBranches), { expires: 30 });
          Cookies.set('selectedProjects', JSON.stringify(selectedProjects), { expires: 30 });
          Cookies.set('darkMode', String(themeState.isDarkMode), { expires: 30 });
          Cookies.set('themeVariant', themeState.themeVariant, { expires: 30 });
          Cookies.set('folderColor', folderColor, { expires: 30 });
          document.body.classList.toggle('dark-mode', themeState.isDarkMode);
        };
        updateCookies();
      }, [selectedSettings, selectedBranches, selectedProjects, themeState, folderColor]);
    
      useEffect(() => {
        const updateDispatch = () => {
          [...selectedSettings, ...selectedBranches].forEach(item => {
            dispatch(removeApiSettings(item));
            dispatch(removeBranchList(item));
          });

          selectedSettings.forEach(setting => dispatch(addApiSettings(setting)));
          selectedBranches.forEach(branch => dispatch(addBranchList(branch)));
        };
        updateDispatch();
      }, [dispatch, selectedSettings, selectedBranches]);
    
      useEffect(() => {
        const initializeState = () => {
          const savedProjects = Cookies.get('selectedProjects');
          const savedFeatureCount = Cookies.get('featureCount');
          const savedSearchedItems = Cookies.get('selectedSearchedItems');
          const savedMode = Cookies.get('darkMode');
          const savedVariant = Cookies.get('themeVariant');
          const savedFolderColor = Cookies.get('folderColor');

          if (savedProjects) {
            const projects = JSON.parse(savedProjects);
            projects.forEach((project: JobDto) => {
              dispatch(addSelectedProject(project));
            });
          }

          if (savedFeatureCount) {
            dispatch(setFeatureCount(parseInt(savedFeatureCount)));
          } else {
            dispatch(setFeatureCount(3));
          }

          if (savedSearchedItems) {
            dispatch(setSelectedItems(JSON.parse(savedSearchedItems)));
          }

          if (savedMode) {
            dispatch(setDarkMode(savedMode === 'true'));
          }

          if (savedVariant) {
            dispatch(setThemeVariant(savedVariant as 'classic' | 'default' | 'nature' | 'sunset' | 'ocean' | 'lavender'));
          }

          if (savedFolderColor) {
            dispatch(setFolderColor(savedFolderColor));
          }
        };

        initializeState();
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
        dispatch(setDarkMode(checked));
        document.body.classList.toggle('dark-mode', checked);
      };
    
      const handleThemeVariantChange = (variant: ThemeVariant) => {
        dispatch(setThemeVariant(variant));
      };
    
      return (
        <StyledDrawer anchor="right" open={visible} onClose={onHide}>
          <Header onHide={onHide} />
          <GeneralSettings 
            isDarkMode={themeState.isDarkMode} 
            themeVariant={themeState.themeVariant}
            onThemeChange={handleThemeChange}
            onThemeVariantChange={handleThemeVariantChange}
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