import React from "react";
import { connect } from "react-redux";
import { TasksSelectors } from "../../store";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import css from "./task.module.css";

export class TaskOriginal extends React.Component {
  render() {
    const { tasks } = this.props;
    const id = this.props.match.params.id;

    if(!tasks[id - 1]) {
      return <div className={css.error}>К сожалению, сегодня не ваш день :(</div>
    } else {
       return (
      <div className={css.wrapper}>
        <p className={css.task}> Ваша задача: {tasks[id - 1].label}</p>
        <textarea rows="10" placeholder="Опишите поподробнее вашу задачу"></textarea>
      </div>
    );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: TasksSelectors.getTasks(state),
  };
};

export const Task = compose(
  withRouter,
  connect(mapStateToProps))(TaskOriginal);
