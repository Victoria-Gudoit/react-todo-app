import { createStore, combineReducers } from "redux";
import { TASKS_ACTIONS } from "./constants";
import { FILTER_STATUSES } from "../components/Tasks/constants";
import { USER_ACTIONS } from "./constants";

const INITIAL_TASKS_STATE = {
  tasks: [
    { id: 1, label: "срочно покормить кота", isDone: true, description: "" },
    { id: 2, label: "поспать 12 часов", isDone: false, description: "" },
    { id: 3, label: "вкусно поесть", isDone: true, description: "" },
  ],
  filter: FILTER_STATUSES.ALL,
};

const generateId = (tasks) => {
  if (tasks.length) {
    const id = tasks.map(({ id }) => id);
    return Math.max(...id) + 1;
  } else return 1;
};

export const tasksReducer = (state = INITIAL_TASKS_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.DELETE_TASK: {
      return {
        tasks: state.tasks.filter(
          ({ id: taskId }) => taskId !== action.payload
        ),
      };
    }

    case TASKS_ACTIONS.ADD_TASK: {
      const id = generateId(state.tasks);
      return {
        tasks: state.tasks.concat({ ...action.payload, id }),
      };
    }

    case TASKS_ACTIONS.TOGGLE_CHECKBOX: {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload) {
            return task;
          }

          return { ...task, isDone: !task.isDone };
        }),
      };
    }

    case TASKS_ACTIONS.addDescriptionTask: {
      return {
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return { ...task, description: action.payload.text };
          }
          return task;
        }),
      };
    }

    default:
      return state;
  }
};

export const filterReducer = (state = INITIAL_TASKS_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.FILTER_TASKS: {
      return {
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

const INITIAL_USER_STATE = {
  isAuth: false,
};

export const registerReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case USER_ACTIONS.USER_AUTHORIZATION: {
      return {
        isAuth: true,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasksReducer,
  filterReducer,
  registerReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
