import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchedItem {
  folderName: string;
  repositoryName: string;
}

interface SearchState {
  selectedItems: SearchedItem[];
}

const initialState: SearchState = {
  selectedItems: [],
};

const searchedItemSlice = createSlice({
  name: "searchedItems",
  initialState,
  reducers: {
    setSelectedItems(state, action: PayloadAction<SearchedItem[]>) {
      console.log(action.payload)
      state.selectedItems = action.payload;
    },
    addSelectedItem(state, action: PayloadAction<SearchedItem>) {
        console.log(action.payload)
      if (!state.selectedItems.some(item => 
        item.folderName === action.payload.folderName && 
        item.repositoryName === action.payload.repositoryName
      )) {
        console.log("Added Item")
        state.selectedItems.push(action.payload);
      }
    },
    removeSelectedItem(state, action: PayloadAction<SearchedItem>) {
      console.log("Removed Item")
      console.log("Action Payload:", action.payload);
      console.log("Before Removal:", state.selectedItems);
      state.selectedItems = state.selectedItems.filter(
        item => !(item.folderName === action.payload.folderName && 
                 item.repositoryName === action.payload.repositoryName)
      );
      console.log(state.selectedItems)
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
  },
});

export const {
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  clearSelectedItems,
} = searchedItemSlice.actions;

export default searchedItemSlice.reducer;