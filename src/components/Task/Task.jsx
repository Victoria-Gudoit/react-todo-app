import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TasksSelectors } from "../../store";
import { useParams } from "react-router-dom";
import css from "./task.module.css";
import { TasksAction } from "../../store";

export const Task = () => {
  const { id } = useParams();

  const GetTaskById = (id) => {
    const todo = useSelector((state) => TasksSelectors.getTaskById(id)(state));
    return todo;
  };

  const task = GetTaskById(id);

  const dispatch = useDispatch();
  const addDescriptionTask = (text, id) =>
    dispatch(TasksAction.addDescriptionTask(text, id));

  const textAreaHandler = ({ target }) => {
    const text = target.value;
    addDescriptionTask(text, +id);
  };

  if (!task) {
    return <div className={css.error}>К сожалению, сегодня не ваш день :(</div>;
  } else {
    return (
      <div className={css.wrapper}>
        <div className={css.task}>
          {task.label}
          <textarea
            onChange={textAreaHandler}
            placeholder="Опишите поподробнее вашу задачу"
            cols="20"
            rows="5"
          ></textarea>
        </div>
      </div>
    );
  }
};
