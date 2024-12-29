import React from 'react';
import {
  Typography,
  Slider,
  useTheme,
  Box,
  AccordionSummary,
  AccordionDetails,
  Button,
  Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AspectRatio, ExpandMore, RestartAlt } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { updateScale, resetScales } from '../../infrastructure/store/slices/Settings/ScreenScales-Slice';
import { SCREEN_SCALES, ScreenType, useScreenSize } from '../../hooks/useScreenSize';
import { StyledAccordion } from './SettingsStyle';

const ScreenScaleSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const scales = useAppSelector((state) => state.screenScales.scales);
  const { type } = useScreenSize();

  const handleScaleChange = (_: Event, value: number | number[]) => {
    dispatch(updateScale({ type, scale: value as number }));
  };

  const handleReset = () => {
    dispatch(resetScales());
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
          <AspectRatio sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight="600">
            Ekran Ölçeklendirme
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AspectRatio sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Tooltip title="Ekran ölçeklendirme oranını ayarlayın" arrow placement="top">
              <Typography variant="body1" fontWeight={500}>
                {type.toUpperCase()} ({scales[type].toFixed(2)}x)
              </Typography>
            </Tooltip>
          </Box>
          <Slider
            value={scales[type]}
            onChange={handleScaleChange}
            min={0.5}
            max={5}
            step={0.05}
            marks={[
              { value: 0.5, label: '0.5x' },
              { value: 1, label: '1x' },
              { value: 2, label: '2x' },
              { value: 3, label: '3x' },
              { value: 4, label: '4x' },
              { value: 5, label: '5x' },
            ]}
            sx={sliderStyles}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Varsayılan değerlere dön" placement="top" arrow>
            <Button 
              variant="contained"
              size="small"
              onClick={handleReset}
              startIcon={<RestartAlt />}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                color: 'white',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transform: 'translateY(-1px)'
                },
                '&:active': {
                  transform: 'translateY(1px)'
                }
              }}
            >
              Sıfırla
            </Button>
          </Tooltip>
        </Box>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ScreenScaleSettings; 