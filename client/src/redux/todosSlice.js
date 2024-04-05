import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

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
  async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${updatedTodo.id}`,
        updatedTodo
      );
      return response.data;
    } catch (error) {
      throw error;
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
        const index = state.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        console.error("Error updating todo:", action.error.message);
      });
  },
});
export default todoSlice.reducer;
