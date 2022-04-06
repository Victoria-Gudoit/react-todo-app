export const tasks = [
  { id: 1, label: "срочно покормить кота", isDone: false },
  { id: 2, label: "поспать 12 часов", isDone: true },
  { id: 3, label: "вкусно поесть", isDone: true },
];

export const FILTER_STATUSES = {
  ALL: "all",
  DONE: "isDone",
  TODO: "todo",
};

export const filterOptions = [
  { value: FILTER_STATUSES.ALL, label: "Все" },
  { value: FILTER_STATUSES.DONE, label: "Сделанные" },
  { value: FILTER_STATUSES.TODO, label: "Несделанные" },
];
