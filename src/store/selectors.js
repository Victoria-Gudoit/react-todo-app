import { FILTER_STATUSES } from "../components/constants";

export const filterTasks = (filter, task) => {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.DONE) {
    return task.isDone;
  }

  return !task.isDone;
};

const getTasksBranch = (state) => state.tasks;

export const getTasksOriginal = (state) => getTasksBranch(state).values;
export const getFilter = (state) => getTasksBranch(state).filter;

export const getTasks = (state) => {
  const tasks = getTasksOriginal(state);
  const filter = getFilter(state);

  return tasks.filter((task) => filterTasks(filter, task));
};
