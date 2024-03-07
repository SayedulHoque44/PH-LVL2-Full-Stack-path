import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["todo"], //create cache tags
  endpoints: (builder) => ({
    //
    getTodos: builder.query({
      query: (piority) => {
        const params = new URLSearchParams(); // this used for first query task only, better approch

        if (piority) {
          params.append("piority", piority);
        }

        return {
          //return object or string for query only
          //   url: `/tasks?piority=${piority}` --> 1 way to query ,
          url: `/tasks`,
          method: "GET", // capital letter always
          //params: { piority }, //---> 2nd way
          params: params, //---> 2nd way
        };
      },
      providesTags: ["todo"], //use the tag
    }),
    //
    addTodo: builder.mutation({
      //mutation for post/patch/writeOperatin
      query: (data) => {
        return {
          //return object or string for query only
          url: "/task",
          method: "POST", // capital letter always
          body: data,
        };
      },
      invalidatesTags: ["todo"], //invalid the tag for refatch the tag where used
    }),
    updateTodo: builder.mutation({
      //mutation for post/patch/writeOperatin
      query: ({ data, id }) => {
        return {
          //return object or string for query only
          url: `/task/${id}`,
          method: "PUT", // capital letter always
          body: data,
        };
      },
      invalidatesTags: ["todo"], //invalid the tag for refatch the tag where used
    }),
    DeleteTodo: builder.mutation({
      //mutation for post/patch/writeOperatin
      query: (id) => {
        return {
          //return object or string for query only
          url: `/task/${id}`,
          method: "DELETE", // capital letter always
        };
      },
      invalidatesTags: ["todo"], //invalid the tag for refatch the tag where used
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
