import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../components/utils/utils";

export const { actions, reducer } = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      { id: 1, label: "срочно покормить кота", isDone: true, description: "" },
      { id: 2, label: "поспать 12 часов", isDone: false, description: "" },
      { id: 3, label: "вкусно поесть", isDone: true, description: "" },
    ],
  },
  reducers: {
    deleteTask: (state, action) => {
      return {
        tasks: state.tasks.filter(
          ({ id: taskId }) => taskId !== action.payload
        ),
      };
    },
    addTask: (state, action) => {
      const id = generateId(state.tasks);
      return {
        tasks: state.tasks.concat({ ...action.payload, id }),
      };
    },
    toggleTask: (state, action) => {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload) {
            return task;
          }

          return { ...task, isDone: !task.isDone };
        }),
      };
    },
    addDescriptionTask: (state, action) => {
      return {
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return { ...task, description: action.payload.text };
          }
          return task;
        }),
      };
    },
  },
});
