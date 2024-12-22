import { useAppSelector, useAppDispatch } from '../../infrastructure/store/store';
import { Box, Grid, IconButton, Paper, Fade, Typography } from '@mui/material';
import RepositoryItem from '../items/RepositoryItem';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { clearSelectedItems, removeSelectedItem } from '../../infrastructure/store/slices/File/SelectedSearchedItem-Slice';

const StyledBox = styled(Paper)(({ theme }) => ({
  padding: '24px',
  margin: '16px 8px',
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
  }
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: '12px',
  top: '12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(0,0,0,0.04)',
    transform: 'scale(1.1)',
  }
});

const SearchHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '20px',
  paddingBottom: '12px',
  borderBottom: '1px solid rgba(0,0,0,0.06)'
});

const SearchedItemBox = () => {
  const dispatch = useAppDispatch();
  const searchedItems = useAppSelector((state) => state.getSearchedItems.selectedItems);

  const handleClose = () => {
    dispatch(clearSelectedItems());
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeSelectedItem(item));
  };

  if (searchedItems.length === 0) return null;

  return (
    <Fade in={true} timeout={300}>
      <StyledBox elevation={0}>
        <CloseButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </CloseButton>

        <SearchHeader>
          <SearchIcon sx={{ color: 'primary.main', opacity: 0.7 }} />
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 500, color: 'text.secondary' }}>
            Arama Sonuçları ({searchedItems.length})
          </Typography>
        </SearchHeader>
        
        <Grid container spacing={2}>
          {searchedItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={300 + index * 100}>
                <Box sx={{ position: 'relative' }}>
                  <IconButton 
                    size="small"
                    onClick={() => handleRemoveItem(item)}
                    sx={{
                      position: 'absolute',
                      right: 5,
                      top: 5,
                      zIndex: 1,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <RepositoryItem
                    job={{
                      name: item.repositoryName,
                    }}
                    parent={item.folderName}
                  />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </StyledBox>
    </Fade>
  )
}

export default SearchedItemBox