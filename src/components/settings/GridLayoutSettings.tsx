import React from 'react';
import {
  Typography,
  Slider,
  useTheme,
  Box,
  AccordionSummary,
  AccordionDetails,
  Tooltip
} from '@mui/material';
import { ViewModule, ExpandMore, GridView, Spa } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../infrastructure/store/store';
import { setItemsPerRow, setSpacing } from '../../infrastructure/store/slices/Settings/GridLayout-Slice';
import { StyledAccordion } from './SettingsStyle';

const GridLayoutSettings: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { itemsPerRow, spacing } = useSelector((state: RootState) => state.gridLayout);

  const handleItemsPerRowChange = (_: Event, value: number | number[]) => {
    dispatch(setItemsPerRow(value as number));
  };

  const handleSpacingChange = (_: Event, value: number | number[]) => {
    dispatch(setSpacing(value as number));
  };

  const getItemsPerRowText = (value: number) => {
    switch(value) {
      case 1: return 'Tek Sütun';
      case 2: return 'İki Sütun';
      case 3: return 'Üç Sütun';
      case 4: return 'Dört Sütun';
      case 5: return 'Beş Sütun';
      case 6: return 'Altı Sütun';
      case 7: return 'Yedi Sütun';
      case 8: return 'Sekiz Sütun';
      default: return `${value} Sütun`;
    }
  };

  const getSpacingText = (value: number) => {
    switch(value) {
      case 1: return 'Dar';
      case 2: return 'Normal';
      case 3: return 'Geniş';
      case 4: return 'Çok Geniş';
      default: return `${value}`;
    }
  };

  const sliderStyles = {
    '& .MuiSlider-rail': {
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
        : 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
      height: 6
    },
    '& .MuiSlider-track': {
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      border: 'none',
      height: 6
    },
    '& .MuiSlider-mark': {
      backgroundColor: theme.palette.primary.main,
      height: 12,
      width: 2,
      '&.MuiSlider-markActive': {
        backgroundColor: theme.palette.common.white,
      }
    },
    '& .MuiSlider-thumb': {
      width: 16,
      height: 16,
      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}33`
      },
      '&::after': {
        width: 8,
        height: 8,
        backgroundColor: theme.palette.common.white,
      }
    }
  };

  return (
    <StyledAccordion>
      <AccordionSummary 
        expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}
        sx={{ 
          '&:hover': { 
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.04)' 
          } 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ViewModule sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight="600">
            Görünüm Ayarları
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <GridView sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Tooltip title="Ekrandaki öğelerin sütun sayısını ayarlayın" arrow placement="top">
              <Typography variant="body1" fontWeight={500}>
                {getItemsPerRowText(itemsPerRow)}
              </Typography>
            </Tooltip>
          </Box>
          <Slider
            value={itemsPerRow}
            min={1}
            max={8}
            step={1}
            marks
            onChange={handleItemsPerRowChange}
            sx={sliderStyles}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Spa sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Tooltip title="Öğeler arasındaki boşluk miktarını ayarlayın" arrow placement="top">
              <Typography variant="body1" fontWeight={500}>
                Boşluk: {getSpacingText(spacing)}
              </Typography>
            </Tooltip>
          </Box>
          <Slider
            value={spacing}
            min={1}
            max={4}
            step={1}
            marks
            onChange={handleSpacingChange}
            sx={sliderStyles}
          />
        </Box>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default GridLayoutSettings;