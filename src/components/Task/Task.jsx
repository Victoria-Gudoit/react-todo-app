import React from "react";
import { connect } from "react-redux";
import { TasksSelectors, TasksActionCreators } from "../../store";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import css from "./task.module.css";

export class TaskOriginal extends React.Component {

  textAreaHandler = (event) => {
    const text = event.target.value;
    this.props.addDescriptionTask(text, +this.props.match.params.id);
  };

  render() {
    const {id} = this.props.match.params
    const task = this.props.getTaskById(id)

    if(!task) {
      return <div className={css.error}>К сожалению, сегодня не ваш день :(</div>
    } else {
       return (
         <div className={css.wrapper}>
        <div className={css.task}>{task.label}
         <textarea onChange={this.textAreaHandler} placeholder="Опишите поподробнее вашу задачу" cols="20" rows="5"></textarea>
         </div>
         </div>
    )}
    }
}

const mapStateToProps = (state) => {
  return {
     getTaskById: (id) => TasksSelectors.getTaskById(id)(state)
  }
};

const mapDispatchToProps = (dispatch) => ({
  addDescriptionTask: (text, id) =>
    dispatch(TasksActionCreators.addDescriptionTask(text, id)),
});

export const Task = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(TaskOriginal);
