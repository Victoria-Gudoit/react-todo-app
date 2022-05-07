import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer as tasksReducer } from "./slice";
import { reducer as filterReducer } from "./filterSlice";
import { reducer as registerReducer } from "./registerSlice";

const rootReducer = combineReducers({
  tasksReducer,
  filterReducer,
  registerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
