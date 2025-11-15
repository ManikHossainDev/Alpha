import { baseApi } from "@/redux/api/baseApi";
const todos = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateTodos: builder.mutation({
      query: (data) => ({
        url: "/api/todos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tondos"],
    }),
    getTodos: builder.query({
      query: () => ({
        url: "/api/todos/",
        method: "GET",
      }),
      providesTags: ["tondos"],
    }),
    UpdateTodos: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/todos/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tondos"],
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["tondos"],
    }),
  }),
});

export const {
  useCreateTodosMutation,
  useGetTodosQuery,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = todos;
