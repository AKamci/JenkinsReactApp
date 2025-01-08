import React, { useState } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box,
  useTheme,
  Popper,
  ClickAwayListener
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  sx?: any;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  sx = {}
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const event = {
      target: { value: value + emojiData.emoji },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleEmojiButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        position: 'relative',
        ...sx
      }}
    >
      <IconButton 
        size="small"
        onClick={handleEmojiButtonClick}
        sx={{ 
          color: open ? theme.palette.primary.main : theme.palette.text.secondary,
          '&:hover': {
            color: theme.palette.primary.main
          }
        }}
      >
        <EmojiEmotionsIcon />
      </IconButton>

      <Popper 
        open={open} 
        anchorEl={anchorEl}
        placement="top-start"
        sx={{ 
          zIndex: 1500,
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))'
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              autoFocusSearch={false}
              theme={theme.palette.mode}
              searchPlaceHolder="Emoji ara..."
              skinTonesDisabled
              height={350}
              width={320}
            />
          </Box>
        </ClickAwayListener>
      </Popper>

      <InputBase
        fullWidth
        multiline
        maxRows={4}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Mesajınızı yazın..."
        sx={{
          flex: 1,
          fontSize: '0.95rem',
          '& .MuiInputBase-input': {
            p: 1,
          }
        }}
      />

      <IconButton
        onClick={onSend}
        disabled={!value.trim()}
        sx={{
          backgroundColor: value.trim() ? theme.palette.primary.main : 'transparent',
          color: value.trim() ? 'white' : theme.palette.text.disabled,
          '&:hover': {
            backgroundColor: value.trim() ? theme.palette.primary.dark : 'transparent',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}; 