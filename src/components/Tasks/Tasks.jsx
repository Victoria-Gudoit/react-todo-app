import React from "react";
import css from "./tasks.module.css";
import { filterOptions } from "./constants";
import { CheckboxGroup } from "../common/Checkbox";
import { connect } from "react-redux";
import { TasksSelectors, TasksActionCreators } from "../../store";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";

class TasksOriginal extends React.Component {
  state = {
    taskInput: "",
  };


  inputChangeHandler = (event) => {
    this.setState({ taskInput: event.target.value });
  };

  addTaskHandler = () => {
    this.props.addTask({ label: this.state.taskInput, isDone: false });
    this.setState({ taskInput: "" });
  };

  render() {
    const { taskInput } = this.state;
    const { tasks, filter } = this.props;

    return (
      <div className={css.wrapper}>
        <h1 className={css.title}>My todo</h1>
        <form className={css.form}>
          <input
            value={taskInput}
            onChange={this.inputChangeHandler}
            type="text"
            className={css.input}
          />
          <button
            onClick={this.addTaskHandler}
            type="button"
            className={css.btn}
          >
            {" "}
            Add task{" "}
          </button>
        </form>
        <div>
          {" "}
          <CheckboxGroup
            options={filterOptions}
            value={filter}
            onChange={ (event) => this.props.changeFilter(event.target.value)}
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
                    this.props.toggleTask(id);
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
                      this.props.deleteTask(id);
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
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: TasksSelectors.getTasks(state),
    filter: TasksSelectors.getFilter(state),
  };
};

const mapDispatchToProps = {
  deleteTask: TasksActionCreators.deleteTask,
  addTask: TasksActionCreators.addTask,
  toggleTask: TasksActionCreators.toggleTask,
  changeFilter: TasksActionCreators.changeFilter,
};

export const Tasks = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TasksOriginal);
