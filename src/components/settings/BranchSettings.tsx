import { useTheme } from "@emotion/react";
import { ExpandMore, AccountTree, BugReport } from "@mui/icons-material";
import { AccordionSummary, Box, Typography, AccordionDetails, Chip, alpha, Theme, TextField, Switch, FormControlLabel, Paper } from "@mui/material";
import { StyledAccordion } from "./SettingsStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store/store";
import { setFeatureCount } from "../../infrastructure/store/slices/File/FeatureCount-Slice";
import { setTestOpenClose } from "../../infrastructure/store/slices/Test/TestOpenClose-Slice";

const BranchSettings: React.FC<{
    selectedBranches: string[];
    handleBranchChange: (key: string, checked: boolean) => void;
  }> = ({ selectedBranches, handleBranchChange }) => {
    const theme = useTheme() as Theme;
    const dispatch = useDispatch();
    const featureCount = useSelector((state: RootState) => state.getFeatureCount.count);
    const isTestResultsOpen = useSelector((state: RootState) => state.getTestOpenClose.isOpen);

    const branches = ['dev', 'stable', 'stage', 'prod', 'feature'];
  
    const handleFeatureCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value) || 0;
      if (value >= 0 && value <= 100) {
        dispatch(setFeatureCount(value));
      }
    };

    return (
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountTree sx={{ color: theme?.palette?.primary?.main || '#1976d2', fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="600">
              Branch Ayarları
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2,
              background: alpha(theme?.palette?.primary?.main || '#1976d2', 0.04),
              border: `1px solid ${alpha(theme?.palette?.primary?.main || '#1976d2', 0.1)}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BugReport 
                sx={{ 
                  color: theme?.palette?.primary?.main || '#1976d2', 
                  fontSize: 22,
                  filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))'
                }} 
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isTestResultsOpen}
                    onChange={(e) => dispatch(setTestOpenClose(e.target.checked))}
                    size="small"
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme?.palette?.primary?.main || '#1976d2'
                      }
                    }}
                  />
                }
                label={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      color: theme?.palette?.text?.primary
                    }}
                  >
                    Test Sonuçlarını Görüntüle
                  </Typography>
                }
                sx={{ m: 0 }}
              />
            </Box>
          </Paper>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {branches.map((branch) => (
              <Chip
                key={branch}
                size="small"
                label={
                  branch === 'feature' && selectedBranches.includes('feature') ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      feature
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          backgroundColor: alpha(theme?.palette?.primary?.main || '#1976d2', 0.15),
                          borderRadius: '10px',
                          padding: '0 4px',
                          minWidth: '32px',
                          height: '16px'
                        }}
                      >
                        <TextField
                          size="small"
                          type="number"
                          value={featureCount}
                          onChange={handleFeatureCountChange}
                          variant="standard"
                          onClick={(e) => e.stopPropagation()}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          sx={{
                            width: '28px',
                            '& input': {
                              padding: 0,
                              fontSize: '0.65rem',
                              color: 'inherit',
                              textAlign: 'center',
                              '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                                display: 'none'
                              }
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  ) : branch
                }
                icon={<AccountTree sx={{ fontSize: 16 }} />}
                onClick={() => handleBranchChange(branch, !selectedBranches.includes(branch))}
                color={selectedBranches.includes(branch) ? 'primary' : 'default'}
                variant={selectedBranches.includes(branch) ? 'filled' : 'outlined'}
                sx={{ 
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: selectedBranches.includes(branch) 
                      ? alpha(theme?.palette?.primary?.main || '#1976d2', 0.85)
                      : alpha(theme?.palette?.primary?.main || '#1976d2', 0.1),
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }
                }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </StyledAccordion>
    );
};

export default BranchSettings;