import React, { useState } from "react";
import css from "./tasks.module.css";
import { filterOptions } from "./constants";
import { CheckboxGroup } from "../common/Checkbox";
import { TasksSelectors } from "../../store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TasksAction, filterAction } from "../../store";

export const Tasks = () => {
  const [taskInput, setTaskInput] = useState("");

  const tasks = useSelector(TasksSelectors.getTasks);
  const filter = useSelector(TasksSelectors.getFilter);

  const dispatch = useDispatch();
  const deleteTask = (id) => dispatch(TasksAction.deleteTask(id));
  const addTask = (task) => dispatch(TasksAction.addTask(task));
  const toggleTask = (id) => dispatch(TasksAction.toggleTask(id));
  const changeFilter = (event) => dispatch(filterAction.changeFilter(event));

  const addTaskHandler = () => {
    addTask({ label: taskInput, isDone: false });
    setTaskInput("");
  };


  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>My todo</h1>
      <form className={css.form}>
        <input
          value={taskInput}
          onChange={({ target }) => setTaskInput(target.value)}
          type="text"
          className={css.input}
        />
        <button onClick={addTaskHandler} type="button" className={css.btn}>
          Add task
        </button>
      </form>
      <div>
        <CheckboxGroup
          options={filterOptions}
          value={filter}
          onChange={({ target }) => changeFilter(target.value)}
        />
      </div>
      <ul className={css.list}>
        {tasks.map(({ id, label, isDone }) => (
          <li className={css.item} key={id}>
            <div>
              <input
                checked={isDone}
                type="checkbox"
                onChange={() => {
                  toggleTask(id);
                }}
                className={css.checkbox}
              />
              {label}
            </div>
            <div className={css.btns}>
              <Link className={css.link} to={`/task/${id}`}>
                Перейти
              </Link>
              {isDone && (
                <button
                  onClick={() => {
                    deleteTask(id);
                  }}
                  type="button"
                  className={css.btn}
                >
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
