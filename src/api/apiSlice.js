import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { URLrtkq } from "../helpers/url";

//const URL = "http://localhost:3034/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({ baseUrl: URLrtkq }), {
    maxRetries: 1,
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({}),
});
