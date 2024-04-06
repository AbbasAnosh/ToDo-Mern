import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const apiUrl = "http://localhost:3000/api/todos";

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  try {
    const response = await axios.post("http://localhost:3000/api/todos", todo);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ updatedTodo, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/${_id}`, updatedTodo);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        console.error("Error adding todo:", action.error.message);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const todoIndex = state.findIndex(
          (todo) => todo._id === updatedTodo._id
        );
        if (todoIndex !== -1) {
          state[todoIndex] = updatedTodo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        console.error("Error updating todo:", action.error.message);
      });
  },
});
export default todoSlice.reducer;
