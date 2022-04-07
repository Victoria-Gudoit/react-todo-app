import React from "react";
import css from "./styles.module.css";
import { FILTER_STATUSES, filterOptions } from "./constants";
import { CheckboxGroup } from "./common";

const filterTask = (filter, task) => {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.DONE) {
    return task.isDone;
  }

  return !task.isDone;
};

const generateUniqId = () => {
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return id;
};

export class App extends React.Component {
  state = {
    tasks: [
      { id: 1, label: "срочно покормить кота", isDone: true },
      { id: 2, label: "поспать 12 часов", isDone: false },
      { id: 3, label: "вкусно поесть", isDone: true },
    ],
    taskInput: "",
    filter: FILTER_STATUSES.ALL,
  };

  deleteTaskHandler = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(({ id: taskId }) => taskId !== id),
    }));
  };

  inputChangeHandler = (event) => {
    this.setState({ taskInput: event.target.value });
  };

  addTaskHandler = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.concat([
        { id: generateUniqId(), label: prevState.taskInput, isDone: false },
      ]),
    }));
  };

  toggleCheckbox = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return { ...task, isDone: !task.isDone };
      }),
    }));
  };

  changeFilterHandler = (event) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { tasks, taskInput, filter } = this.state;

    return (
      <div className={css.wrapper}>
        <h1 className={css.title}>My todo</h1>
        <form className={css.form}>
          <input value={taskInput} onChange={this.inputChangeHandler} type="text" className={css.input} />
          <button onClick={this.addTaskHandler} type="button" className={css.btn} > Add task </button>
        </form>
        <div> <CheckboxGroup options={filterOptions} value={filter} onChange={this.changeFilterHandler} />
        </div>
        <ul className={css.list}>
          {tasks.filter((task) => filterTask(filter, task)).map(({ id, label, isDone }) => (
              <li className={css.item} key={id}>
                <input checked={isDone} type="checkbox" onChange={() => {this.toggleCheckbox(id)}} className={css.checkbox} />
                {label}
                {isDone && (<button onClick={() => {this.deleteTaskHandler(id)}} type="button" className={css.btn} >
                    Remove
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
