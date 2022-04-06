import css from "./styles.module.css";
import { tasks, FILTER_STATUSES, filterOptions } from "./constants";
import { CheckboxGroup } from "./common";

const filter = FILTER_STATUSES.DONE;

const filterTask = (filter, task) => {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.DONE) {
    return task.isDone;
  }

  return !task.isDone;
};

export function App() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>My todo</h1>
      <form className={css.form}>
        <input type="text" className={css.input} />
        <button type="button" className={css.btn}>
          Add task
        </button>
      </form>
      <div>
        <CheckboxGroup options={filterOptions} value={FILTER_STATUSES.DONE} />
      </div>
      <ul className={css.list}>
        {tasks.filter((task) => filterTask(filter, task)).map(({ id, label, isDone }) => (
            <li className={css.item} key={id}>
              <input type="checkbox" className={css.checkbox} checked={isDone} />
              {label}
              {isDone && <button type="button" className={css.btn}>Remove</button>}
            </li>
          ))}
      </ul>
    </div>
  );
}
