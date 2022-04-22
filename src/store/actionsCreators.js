import { TASKS_ACTIONS } from "./constants";

export const deleteTask = (id) => ({
  payload: id,
  type: TASKS_ACTIONS.DELETE_TASK,
});

export const addTask = (task) => ({
  payload: task,
  type: TASKS_ACTIONS.ADD_TASK,
});

export const toggleCheckbox = (id) => ({
  payload: id,
  type: TASKS_ACTIONS.TOGGLE_CHECKBOX,
});

export const changeFilter = (event) => ({
  payload: event,
  type: TASKS_ACTIONS.FILTER_TASKS,
});
