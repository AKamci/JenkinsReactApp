import { ExpandMore, Tune, DarkMode, LightMode } from "@mui/icons-material";
import { AccordionSummary, Box, Typography, AccordionDetails, Switch } from "@mui/material";
import { StyledAccordion } from "./SettingsStyle";
import { SettingItem } from "./SettingsStyle";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../infrastructure/store/store";
import { setDarkMode } from "../../infrastructure/store/slices/GeneralSettings/Theme-Slice";

const GeneralSettings: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);

  const handleThemeChange = (checked: boolean) => {
    dispatch(setDarkMode(checked));
    console.log(isDarkMode, "isDarkMode")
  };

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
            width: '100%'
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
              onChange={(e) => handleThemeChange(e.target.checked)}
              color="primary"
            />
          </Box>
        </SettingItem>
      </AccordionDetails>
    </StyledAccordion>
  );
};  

export default GeneralSettings;
