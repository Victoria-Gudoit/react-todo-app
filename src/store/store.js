import { createStore, combineReducers } from "redux";
import { TASKS_ACTIONS } from "./constants";
import { FILTER_STATUSES } from "../components/Tasks/constants";

const INITIAL_STATE = {
  tasks: [
    { id: 1, label: "срочно покормить кота", isDone: true },
    { id: 2, label: "поспать 12 часов", isDone: false },
    { id: 3, label: "вкусно поесть", isDone: true },
  ],
  filter: FILTER_STATUSES.ALL,
  isAuth: false,
};

export const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.DELETE_TASK: {
      return {
        tasks: state.tasks.filter(
          ({ id: taskId }) => taskId !== action.payload
        ),
      };
    }

    case TASKS_ACTIONS.ADD_TASK: {
      const id = state.tasks.length + 1;
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

    default:
      return state;
  }
};

export const filterReducer = (state = INITIAL_STATE, action) => {
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

export const registerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.CHECK_AUTHORIZATION: {
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
