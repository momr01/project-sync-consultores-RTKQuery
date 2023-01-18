import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const employeeAdapter = createEntityAdapter({
  selectId: (employee) => employee._id,
});

const initialState = employeeAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.mutation({
      query: (loginData) => ({
        url: "/employees/login",
        method: "POST",
        body: loginData,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
    getEmployees: builder.query({
      query: () => "/employees",
      transformResponse: (responseData) => {
        return employeeAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Employees", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Employees", id })),
      ],
    }),
    addNewEmployee: builder.mutation({
      query: (initialEmployee) => ({
        url: "/employees",
        method: "POST",
        body: initialEmployee,
      }),
      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),
    updateEmployee: builder.mutation({
      query: (initialEmployee) => ({
        url: `/employees/${initialEmployee._id}`,
        method: "PUT",
        body: initialEmployee,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employees", id: arg.id },
      ],
    }),
    deleteEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/employees/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employees", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetLoginMutation,
  useGetEmployeesQuery,
  useAddNewEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = extendedApiSlice;

// returns the query result object - entire result object, not just data
export const selectEmployeesResult =
  extendedApiSlice.endpoints.getEmployees.select();

// Creates memoized selector
const selectEmployeesData = createSelector(
  selectEmployeesResult,
  (workersResult) => workersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllEmployees,
  selectById: selectEmployeesById,
  selectIds: selectEmployeesIds,
  // Pass in a selector that returns the posts slice of state
} = employeeAdapter.getSelectors(
  (state) => selectEmployeesData(state) ?? initialState
);
