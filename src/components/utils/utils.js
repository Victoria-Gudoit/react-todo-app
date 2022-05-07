export const generateId = (tasks) => {
  if (tasks.length) {
    const id = tasks.map(({ id }) => id);
    return Math.max(...id) + 1;
  } else return 1;
};
