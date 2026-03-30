import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    activeSection: "hero",
    preloaderDone: false,
    menuOpen: false,
  },
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    setPreloaderDone: (state, action) => {
      state.preloaderDone = action.payload;
    },
    setMenuOpen: (state, action) => {
      state.menuOpen = action.payload;
    },
  },
});

export const { setActiveSection, setPreloaderDone, setMenuOpen } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;

