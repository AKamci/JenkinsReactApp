import { alpha } from "@mui/material/styles";

import { styled } from "@mui/material/styles";

import { Accordion, Paper, ToggleButton } from "@mui/material";

import { Drawer } from "@mui/material";

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
  export { StyledDrawer, StyledAccordion, StyledToggleButton, SettingItem };