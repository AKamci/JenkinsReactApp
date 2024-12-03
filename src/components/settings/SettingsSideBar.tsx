import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import Cookies from 'js-cookie';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';

interface SidebarComponentProps {
  visible: boolean;
  onHide: () => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ visible, onHide }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = Cookies.get('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    Cookies.set('darkMode', String(isDarkMode), { expires: 30 });

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Sidebar visible={visible} position="right" onHide={onHide}>
      <h3>Ayarlar</h3>
      <p>Gece Moduna Geçiş</p>
      <InputSwitch checked={isDarkMode} onChange={(e: InputSwitchChangeEvent) => setIsDarkMode(e.value)} />
    </Sidebar>
  );
};

export default SidebarComponent;
