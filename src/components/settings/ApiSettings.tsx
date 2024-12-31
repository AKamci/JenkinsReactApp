import { ExpandMore, Security, ColorLens, Check } from "@mui/icons-material";
import { AccordionSummary, Box, Typography, AccordionDetails, Chip } from "@mui/material";
import { SettingItem } from "./SettingsStyle";
import { StyledAccordion } from "./SettingsStyle";

const ApiSettings: React.FC<{
    selectedSettings: string[];
    handleSettingChange: (key: string, checked: boolean) => void;
  }> = ({ selectedSettings, handleSettingChange }) => {
    return (
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
        </AccordionDetails>
      </StyledAccordion>
    );
  };
  
  export default ApiSettings;