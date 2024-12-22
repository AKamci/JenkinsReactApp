import { useTheme } from "@emotion/react";
import { ExpandMore, AccountTree } from "@mui/icons-material";
import { AccordionSummary, Box, Typography, AccordionDetails, Chip, alpha, Theme, TextField } from "@mui/material";
import { StyledAccordion } from "./SettingsStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../infrastructure/store/store";
import { setFeatureCount } from "../../infrastructure/store/slices/File/FeatureCount-Slice";

const BranchSettings: React.FC<{
    selectedBranches: string[];
    handleBranchChange: (key: string, checked: boolean) => void;
  }> = ({ selectedBranches, handleBranchChange }) => {
    const theme = useTheme() as Theme;
    const dispatch = useDispatch();
    const featureCount = useSelector((state: RootState) => state.getFeatureCount.count);

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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
                            },
                            '& .MuiInputAdornment-root': {
                              marginRight: 0,
                              marginLeft: '-2px'
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
                  '&:hover': {
                    backgroundColor: selectedBranches.includes(branch) 
                      ? alpha(theme?.palette?.primary?.main || '#1976d2', 0.85)
                      : alpha(theme?.palette?.primary?.main || '#1976d2', 0.1)
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