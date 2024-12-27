import { ExpandMore, Tune, DarkMode, LightMode, Palette } from "@mui/icons-material";
import { AccordionSummary, Box, Typography, AccordionDetails, Switch, RadioGroup, FormControlLabel, Radio, Paper } from "@mui/material";
import { StyledAccordion } from "./SettingsStyle";
import { SettingItem } from "./SettingsStyle";
import { ThemeVariant } from "../../theme/theme";

interface GeneralSettingsProps {
  isDarkMode: boolean;
  themeVariant: ThemeVariant;
  onThemeChange: (checked: boolean) => void;
  onThemeVariantChange: (variant: ThemeVariant) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  isDarkMode, 
  themeVariant,
  onThemeChange,
  onThemeVariantChange
}) => {


  const themeOptions = isDarkMode ? [
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Klasik' },
    { value: 'default', label: 'Açık Siyah' },
    { value: 'nature', label: 'Koyu Yeşil' },
    { value: 'sunset', label: 'Koyu Kahve' },
    { value: 'ocean', label: 'Koyu Mavi' },
    { value: 'lavender', label: 'Koyu Mor' }
  ] : [
    { value: 'modern', label: 'Modern' },
    { value: 'default', label: 'Mor' },
    { value: 'nature', label: 'Yeşil' },
    { value: 'sunset', label: 'Turuncu' },
    { value: 'ocean', label: 'Mavi' },
    { value: 'lavender', label: 'Pembe' }
  ];

  return (
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
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%',
            mb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isDarkMode ? (
                <DarkMode sx={{ color: 'primary.main', fontSize: 20, mr: 1 }} />
              ) : (
                <LightMode sx={{ color: 'primary.main', fontSize: 20, mr: 1 }} />
              )}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {isDarkMode ? 'Koyu Mod' : 'Açık Mod'}
              </Typography>
            </Box>
            <Switch
              checked={isDarkMode}
              onChange={(e) => onThemeChange(e.target.checked)}
              color="primary"
            />
          </Box>
        </SettingItem>

        <SettingItem elevation={0}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Palette sx={{ color: 'primary.main', fontSize: 20, mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Tema Varyantı
              </Typography>
            </Box>
            <RadioGroup
              value={themeVariant}
              onChange={(e) => onThemeVariantChange(e.target.value as ThemeVariant)}
            >
              {themeOptions.map((theme) => (
                <Paper
                  key={theme.value}
                  elevation={0}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: themeVariant === theme.value ? 'primary.main' : 'divider',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <FormControlLabel 
                    value={theme.value} 
                    control={
                      <Radio 
                        size="small"
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 20
                          }
                        }}
                      />
                    } 
                    label={
                      <Typography variant="body2">
                        {theme.label}
                      </Typography>
                    }
                    sx={{
                      margin: 0,
                      width: '100%'
                    }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </Box>
        </SettingItem>
      </AccordionDetails>
    </StyledAccordion>
  );
};  

export default GeneralSettings;
