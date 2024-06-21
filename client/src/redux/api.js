import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://todo-list-tgi0.onrender.com" }),
  reducerPath: "todo",
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => "/todo",
      providesTags: ["Todo"],
    }),
    doneTask: build.mutation({
      query: ({ id, status }) => ({
        url: `/todo/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    }),
    addNewTodo: build.mutation({
      query: (newTodo) => ({
        url: `/todo`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
    }),
    updateTodo: build.mutation({
      query: ({ id, updatedTodo }) => ({
        url: `/todo/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedTodo,
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useDoneTaskMutation,
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = api;
