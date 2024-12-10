import React, { useEffect, useState } from 'react';
import { Box, Drawer, Typography, Switch, FormControlLabel, Divider, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Settings, DarkMode, ColorLens, Speed, Close, ExpandMore, Tune, Notifications, Security } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../infrastructure/store/store';
import { addSelectedProject, removeSelectedProject } from '../../infrastructure/store/slices/File/ApiSettings-Slice';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 380,
    padding: theme.spacing(3),
    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
  }
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(0, 1),
    minHeight: 56,
    '&.Mui-expanded': {
      minHeight: 56,
    }
  },
  '& .MuiAccordionSummary-content': {
    margin: '12px 0',
    '&.Mui-expanded': {
      margin: '12px 0'
    }
  }
}));

const SettingItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  }
}));

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
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleSettingChange = (settingKey: string, checked: boolean) => {
    const newSelectedSettings = checked
      ? [...selectedSettings, settingKey]
      : selectedSettings.filter(item => item !== settingKey);
    
    setSelectedSettings(newSelectedSettings);
    dispatch(checked ? addSelectedProject(settingKey) : removeSelectedProject(settingKey));
  };

  return (
    <StyledDrawer anchor="right" open={visible} onClose={onHide}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings color="primary" />
          <Typography variant="h5" fontWeight="600">
            Ayarlar
          </Typography>
        </Box>
        <IconButton onClick={onHide} size="small">
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tune color="primary" />
            <Typography variant="h6" fontWeight="600">
              Genel Ayarlar
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SettingItem>
            <DarkMode sx={{ mr: 2, color: 'primary.main' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Gece Modu
                </Typography>
              }
            />
          </SettingItem>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security color="primary" />
            <Typography variant="h6" fontWeight="600">
              API Ayarları
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SettingItem>
            <ColorLens sx={{ mr: 2, color: 'primary.main' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={selectedSettings.includes('color')}
                  onChange={(e) => handleSettingChange('color', e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Renk Gösterimi
                </Typography>
              }
            />
          </SettingItem>

          <SettingItem>
            <Speed sx={{ mr: 2, color: 'primary.main' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={selectedSettings.includes('score')}
                  onChange={(e) => handleSettingChange('score', e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Skor Gösterimi
                </Typography>
              }
            />
          </SettingItem>
        </AccordionDetails>
      </StyledAccordion>
    </StyledDrawer>
  );
};

export default SidebarComponent;