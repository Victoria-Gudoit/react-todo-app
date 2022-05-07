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
