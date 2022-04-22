import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import { TASKS_ACTIONS } from "./constants";
import { FILTER_STATUSES } from "../components/constants";

const INITIAL_STATE = {
  tasks: {
    values: [
      { id: 1, label: "срочно покормить кота", isDone: true },
      { id: 2, label: "поспать 12 часов", isDone: false },
      { id: 3, label: "вкусно поесть", isDone: true },
    ],
    filter: FILTER_STATUSES.ALL,
  },
};

const usersReducer = (state = INITIAL_STATE.tasks, action) => {
  switch (action.type) {
    case TASKS_ACTIONS.DELETE_TASK: {
      return {
        values: state.values.filter(
          ({ id: taskId }) => taskId !== action.payload
        ),
      };
    }

    case TASKS_ACTIONS.ADD_TASK: {
      const id = uuidv4();
      return {
        values: state.values.concat({ ...action.payload, id }),
      };
    }

    case TASKS_ACTIONS.TOGGLE_CHECKBOX: {
      return {
        values: state.values.map((task) => {
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

const filterReducer = (state = INITIAL_STATE.tasks, action) => {
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

const rootReducer = combineReducers({
  tasks: usersReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
