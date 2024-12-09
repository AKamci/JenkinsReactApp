import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import Cookies from 'js-cookie';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { addSelectedProject, removeSelectedProject } from '../../infrastructure/store/slices/File/ApiSettings-Slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../infrastructure/store/store';

interface SidebarComponentProps {
  visible: boolean;
  onHide: () => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ visible, onHide }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = Cookies.get('darkMode');
    return savedMode === 'true';
  });

  const [selectedSettings, setSelectedSettings] = useState<string[]>([]);

  useEffect(() => {
    Cookies.set('darkMode', String(isDarkMode), { expires: 30 });

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleCheckboxChange = (e: CheckboxChangeEvent, settingKey: string) => {
    const checked = e.checked;
    const newSelectedSettings = checked
      ? [...selectedSettings, settingKey]
      : selectedSettings.filter(item => item !== settingKey);
    
    setSelectedSettings(newSelectedSettings);

    if (checked) {
      dispatch(addSelectedProject(settingKey));
    } else {
      dispatch(removeSelectedProject(settingKey));
    }
  };

  return (
    <Sidebar visible={visible} position="right" onHide={onHide}>
      <h3>Ayarlar</h3>

      <p>Gece Moduna Geçiş</p>
      <InputSwitch checked={isDarkMode} onChange={(e: InputSwitchChangeEvent) => setIsDarkMode(e.value)} />

      <h3>API Ayarları</h3>

      <div>
        <p>Rengi Aç</p>
        <Checkbox checked={selectedSettings.includes('color')} onChange={(e) => handleCheckboxChange(e, 'color')} />
      </div>
      <div>
        <p>Score Aç</p>
        <Checkbox checked={selectedSettings.includes('score')} onChange={(e) => handleCheckboxChange(e, 'score')} />
      </div>
    </Sidebar>
  );
};

export default SidebarComponent;