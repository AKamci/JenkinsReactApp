import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface FolderColorState {
    color: string;
}

const initialState: FolderColorState = {
    color: Cookies.get('folderColor') || '#2ecc71'
};

const folderColorSlice = createSlice({
    name: 'folderColor',
    initialState,
    reducers: {
        setFolderColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        }
    }
});

export const { setFolderColor } = folderColorSlice.actions;
export default folderColorSlice.reducer; 