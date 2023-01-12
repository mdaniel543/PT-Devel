import { createSlice } from "@reduxjs/toolkit";

export const encuestaSlice = createSlice({
  name: "encuesta",
  initialState: {
    encuesta: null
  },
  reducers: {
    setEncuesta: (state, action) => {
      state.encuesta = action.payload;
    }
  },
});

export const {
  setEncuesta
} = encuestaSlice.actions;

export default encuestaSlice.reducer;
