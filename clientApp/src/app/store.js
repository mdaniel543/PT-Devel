import { configureStore } from "@reduxjs/toolkit";
import { apiEncuesta } from "./api/apiEncuesta";
import { apiCampos } from "./api/apiCampos";
import { apiResp } from "./api/apiResp";
import sesionSlice from "./slices/sesion";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["apiEncuesta", "apiCampos", "apiResp"],
};

const persistedReducer = persistReducer(persistConfig, sesionSlice);

export const store = configureStore({
  reducer: {
    sesion: persistedReducer,
    [apiEncuesta.reducerPath]: apiEncuesta.reducer,
    [apiCampos.reducerPath]: apiCampos.reducer,
    [apiResp.reducerPath]: apiResp.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiEncuesta.middleware, apiCampos.middleware, apiResp.middleware),
});

//----------
