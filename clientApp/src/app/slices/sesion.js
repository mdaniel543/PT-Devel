import { createSlice } from "@reduxjs/toolkit";

export const sesionSlice = createSlice({
  name: "sesion",
  initialState: {
    sesion: true,
    usuario: null,
  },
  reducers: {
    iniciarSesion: (state, action) => {
      state.sesion = true;
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
    },
    cerrarSesion: (state) => {
      state.sesion = false;
      state.usuario = null;
    },
    editUsuario: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const {
  editUsuario,
  iniciarSesion,
  cerrarSesion,
} = sesionSlice.actions;

export default sesionSlice.reducer;
