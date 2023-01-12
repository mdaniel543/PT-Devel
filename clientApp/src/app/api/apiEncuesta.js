import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiEncuesta = createApi({
    reducerPath: "apiEncuesta",
    baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7169/Encuesta",
    prepareHeaders: (headers, { getState }) => {
            const token = getState().sesion.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEncuestas: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Encuesta"],
        }),
        getEncuesta: builder.query({
            query: (id) => `/one/${id}`,
        }),
        postEncuesta: builder.mutation({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Encuesta"],
        }),
        putEncuesta: builder.mutation({
            query: (body) => ({
                url: `/${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Encuesta"],
        }),
        deleteEncuesta: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Encuesta"],
        }),
    }),
});

export const {
    useGetEncuestasQuery,
    usePostEncuestaMutation,
    usePutEncuestaMutation,
    useDeleteEncuestaMutation,
    useGetEncuestaQuery
} = apiEncuesta;


                
