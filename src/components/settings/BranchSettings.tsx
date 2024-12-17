import { useTheme } from "@emotion/react";
import { ExpandMore, AccountTree } from "@mui/icons-material";
import { AccordionSummary, Box, Typography, AccordionDetails, Chip, alpha, TextField, Theme } from "@mui/material";
import { StyledAccordion } from "./SettingsStyle";


const BranchSettings: React.FC<{
    selectedBranches: string[];
    handleBranchChange: (key: string, checked: boolean) => void;
    featureCount: number;
    setFeatureCount: React.Dispatch<React.SetStateAction<number>>;
  }> = ({ selectedBranches, handleBranchChange, featureCount, setFeatureCount }) => {
    const theme = useTheme() as Theme;
    const branches = ['dev', 'stable', 'stage', 'prod'];
  
    const handleFeatureCountChange = (newCount: number) => {
      if (selectedBranches.includes('feature')) {
        const oldBuildSetting = `builds[number,url,status,timestamp,result,duration]{,${featureCount}}`;
        handleBranchChange(oldBuildSetting, false);
      }
      setFeatureCount(newCount);
      if (selectedBranches.includes('feature')) {
        const newBuildSetting = `builds[number,url,status,timestamp,result,duration]{,${newCount}}`;
        handleBranchChange(newBuildSetting, true);
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {branches.map((branch) => (
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
                      ? alpha(theme?.palette?.primary?.main || '#1976d2', 0.85)
                      : alpha(theme?.palette?.primary?.main || '#1976d2', 0.1)
                  }
                }}
              />
            ))}
            <Chip
              size="small"
              icon={<AccountTree sx={{ fontSize: 16 }} />}
              onClick={() => {
                const isSelected = !selectedBranches.includes('feature');
                handleBranchChange('feature', isSelected);
                if (isSelected) {
                  const buildSetting = `builds[number,url,status,timestamp,result,duration]{,${featureCount}}`;
                  handleBranchChange(buildSetting, true);
                } else {
                  const buildSetting = `builds[number,url,status,timestamp,result,duration]{,${featureCount}}`;
                  handleBranchChange(buildSetting, false);
                }
              }}
              color={selectedBranches.includes('feature') ? 'primary' : 'default'}
              variant={selectedBranches.includes('feature') ? 'filled' : 'outlined'}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  feature
                  {selectedBranches.includes('feature') && (
                    <TextField
                      size="small"
                      type="number"
                      value={featureCount}
                      onChange={(e) => {
                        const newCount = Math.max(1, parseInt(e.target.value) || 1);
                        handleFeatureCountChange(newCount);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      inputProps={{ 
                        min: 1,
                        max: 99,
                        style: { 
                          padding: '0',
                          width: '24px',
                          height: '16px',
                          fontSize: '12px',
                          textAlign: 'center'
                        }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: alpha(theme?.palette?.common?.white || '#fff', 0.1),
                          '& fieldset': {
                            border: 'none'
                          }
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          display: 'none'
                        }
                      }}
                    />
                  )}
                </Box>
              }
              sx={{ 
                textTransform: 'capitalize',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: selectedBranches.includes('feature') 
                    ? alpha(theme?.palette?.primary?.main || '#1976d2', 0.85)
                    : alpha(theme?.palette?.primary?.main || '#1976d2', 0.1)
                }
              }}
            />
          </Box>
        </AccordionDetails>
      </StyledAccordion>
    );
  };

  export default BranchSettings;