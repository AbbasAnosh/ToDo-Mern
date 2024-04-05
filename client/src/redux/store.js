import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import { todoApi } from "../api/getData";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;
