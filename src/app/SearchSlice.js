import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchItems: [],
};

export const revertSearch = createAction("REVERT_SEARCH");

const SearchSlice = createSlice({
  initialState,
  name: "search",
  extraReducers: (builder) => {
    builder.addCase(revertSearch, (state, action) => {
      state.searchItems = [];
    });
  },
  reducers: {
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
  },
});

export const { setSearchItems } = SearchSlice.actions;

export const selectSearchItems = (state) => state.search.searchItems;

export default SearchSlice.reducer;
