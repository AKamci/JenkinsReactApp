import { Settings, Close } from "@mui/icons-material";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";

const Header: React.FC<{ onHide: () => void }> = ({ onHide }) => {
    return (
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
    );
  };

  export default Header;
  