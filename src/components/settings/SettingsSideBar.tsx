import React, { useEffect, useState } from 'react';
import { Box, Drawer, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Paper, Tooltip, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Settings, DarkMode, ColorLens, Speed, Close, ExpandMore, Tune, Security, AccountTree, Check } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../infrastructure/store/store';
import { addSelectedProject, removeSelectedProject } from '../../infrastructure/store/slices/File/ApiSettings-Slice';
import { addBranchList, removeBranchList } from '../../infrastructure/store/slices/File/SelectedBranchList-Slice';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 360,
    padding: theme.spacing(2),
    background: theme.palette.background.default,
    borderRadius: '12px 0 0 12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  }
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  borderRadius: theme.spacing(1),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(0.5, 1),
    minHeight: 48,
    '&.Mui-expanded': {
      minHeight: 48,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    }
  },
  '& .MuiAccordionSummary-content': {
    margin: '8px 0',
    '&.Mui-expanded': {
      margin: '8px 0'
    }
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(1),
  }
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: 'none',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.5, 2),
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    }
  }
}));

const SettingItem = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`,
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
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

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

  const handleBranchChange = (branchKey: string, checked: boolean) => {
    const newSelectedBranches = checked
      ? [...selectedBranches, branchKey]
      : selectedBranches.filter(item => item !== branchKey);
    
    setSelectedBranches(newSelectedBranches);
    dispatch(checked ? addBranchList(branchKey) : removeBranchList(branchKey));
  };

  return (
    <StyledDrawer anchor="right" open={visible} onClose={onHide}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight="600">
            Ayarlar
          </Typography>
        </Box>
        <Tooltip title="Kapat">
          <IconButton 
            onClick={onHide} 
            size="small"
            sx={{ 
              backgroundColor: 'background.paper',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <StyledAccordion defaultExpanded>
        <AccordionSummary 
          expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
          sx={{ '&.Mui-expanded': { backgroundColor: 'transparent' } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tune sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="600">
              Genel Ayarlar
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SettingItem elevation={0}>
            <DarkMode sx={{ mr: 2, color: 'primary.main', fontSize: 20 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Gece Modu
              </Typography>
              <ToggleButtonGroup
                exclusive
                value={isDarkMode ? 'dark' : 'light'}
                onChange={(_, value) => value && setIsDarkMode(value === 'dark')}
                size="small"
                sx={{ width: '100%' }}
              >
                <StyledToggleButton value="light" sx={{ flex: 1 }}>
                  Açık
                </StyledToggleButton>
                <StyledToggleButton value="dark" sx={{ flex: 1 }}>
                  Koyu
                </StyledToggleButton>
              </ToggleButtonGroup>
            </Box>
          </SettingItem>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="600">
              API Ayarları
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SettingItem elevation={0}>
            <ColorLens sx={{ mr: 2, color: 'primary.main', fontSize: 20 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Renk Gösterimi
              </Typography>
              <Chip
                size="small"
                icon={selectedSettings.includes('color') ? <Check fontSize="small" /> : undefined}
                label={selectedSettings.includes('color') ? 'Aktif' : 'Pasif'}
                onClick={() => handleSettingChange('color', !selectedSettings.includes('color'))}
                color={selectedSettings.includes('color') ? 'primary' : 'default'}
                variant={selectedSettings.includes('color') ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </SettingItem>

          <SettingItem elevation={0}>
            <Speed sx={{ mr: 2, color: 'primary.main', fontSize: 20 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                Skor Gösterimi
              </Typography>
              <Chip
                size="small"
                icon={selectedSettings.includes('score') ? <Check fontSize="small" /> : undefined}
                label={selectedSettings.includes('score') ? 'Aktif' : 'Pasif'}
                onClick={() => handleSettingChange('score', !selectedSettings.includes('score'))}
                color={selectedSettings.includes('score') ? 'primary' : 'default'}
                variant={selectedSettings.includes('score') ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          </SettingItem>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountTree sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="600">
              Branch Ayarları
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {['dev', 'stable', 'stage', 'prod', 'feature'].map((branch) => (
              <Chip
                key={branch}
                size="small"
                label={branch}
                icon={<AccountTree sx={{ fontSize: 16 }} />}
                onClick={() => handleBranchChange(branch, !selectedBranches.includes(branch))}
                color={selectedBranches.includes(branch) ? 'primary' : 'default'}
                variant={selectedBranches.includes(branch) ? 'filled' : 'outlined'}
                sx={{ 
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedBranches.includes(branch) 
                      ? alpha('#1976d2', 0.85)
                      : alpha('#1976d2', 0.1)
                  }
                }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </StyledAccordion>
    </StyledDrawer>
  );
};

export default SidebarComponent;