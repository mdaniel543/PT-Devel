import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiResp = createApi({
  reducerPath: "apiResp",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7169/Respuesta",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().sesion.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRespuestas: builder.query({
      query: (id) => `/${id}`,
    }),
    postRespuestas: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetRespuestasQuery, usePostRespuestasMutation } = apiResp;
