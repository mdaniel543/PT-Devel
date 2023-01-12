import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCampos = createApi({
    reducerPath: "apiCampos",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7169/Campo",
    prepareHeaders: (headers, { getState }) => {
            const token = getState().sesion.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCampos: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Campos"],
        }),
        postCampos: builder.mutation({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
        }),
        putCampos: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteCampos: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCamposQuery,
    usePostCamposMutation,
    usePutCamposMutation,
    useDeleteCamposMutation,
} = apiCampos;

// Path: clientApp\src\app\api\apiCategorias.js
                