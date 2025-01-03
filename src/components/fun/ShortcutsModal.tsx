import React, { useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { toggleShortcutsModal } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';

const shortcuts = [
  { key: 'ALT + CONTROL + F', description: 'Sahte Yükleme Ekranı' },
  { key: 'ALT + CONTROL + C', description: 'Konfeti Efekti' },
  { key: 'ALT + CONTROL + M', description: 'Matrix Yağmuru' },
  { key: 'ALT + CONTROL + D', description: 'Disco Modu' },
  { key: 'ALT + CONTROL + U', description: 'Ters Dünya Modu' },
  { key: 'ALT + CONTROL + P', description: 'Pikselleştirme Efekti' },
  { key: 'ALT + CONTROL + H', description: 'Bu Kısayol Menüsü' },
  { key: 'ALT + CONTROL + G', description: 'Jenkins Takım Odası - Codenames' },
  { key: 'SHIFT', description: 'Header Gizleme' },
  { key: 'CONTROL + K', description: 'Arama Kısayol' },
  { key: 'ALT + CONTROL + R', description: 'Yağmur Efekti' },
  { key: 'ALT + CONTROL + N', description: 'Neon Modu' },
  { key: 'ALT + CONTROL + B', description: 'Retro Bilgisayar Modu' },
  { key: 'ALT + CONTROL + Z', description: 'Ninja Modu' },
];

interface ShortcutsModalProps {
  searchQuery?: string;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ searchQuery }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.funFeatures.isShortcutsModalOpen);

  useEffect(() => {
    if (searchQuery?.toLowerCase() === 'kısayollar') {
      dispatch(toggleShortcutsModal());
    }
  }, [searchQuery, dispatch]);

  const handleClose = () => {
    dispatch(toggleShortcutsModal());
  };
  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">KISAYOLLAR</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {shortcuts.map((shortcut) => (
            <ListItem key={shortcut.key}>
              <ListItemText
                primary={shortcut.description}
                secondary={
                  <Typography 
                    component="span" 
                    sx={{ 
                      backgroundColor: 'action.selected',
                      padding: '2px 6px',
                      borderRadius: 1,
                      fontFamily: 'monospace'
                    }}
                  >
                    {shortcut.key}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}; 