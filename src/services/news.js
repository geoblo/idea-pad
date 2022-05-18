import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: builder => ({
    getHeadlineNews: builder.query({
      query: () => `top-headlines?country=kr&apiKey=1076b488e7a642b6b1f9950f13d28644`,
    }),
  }),
});

export const { useGetHeadlineNewsQuery } = newsApi;