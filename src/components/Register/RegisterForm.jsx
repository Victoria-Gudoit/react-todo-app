import React from "react";
import css from "./register.module.css";
import { connect } from "react-redux";
import { TasksSelectors, TasksActionCreators } from "../../store";

export class Register extends React.Component {
  state = {
    values: { login: "", password: "" },
    errors: { login: "", password: "" },
  };

  inputChangeHandler = (event) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [event.target.name]: event.target.value,
      },
      errors: {
        ...prevState.errors,
        [event.target.name]: "",
      },
    }));
  };

  clickHandler = (e) => {
    e.preventDefault();
    const isValid =
      this.state.values.login.length > 5 &&
      this.state.values.password.length > 5;
    this.setState(() => ({
      errors: {
        login:
          this.state.values.login.length > 5
            ? ""
            : "Логин не меньше 5 символов!",
        password:
          this.state.values.password.length > 5
            ? ""
            : "Пароль не меньше 5 символов!",
      },
    }));

    if (isValid) {
      this.props.checkAuth();
    }
  };

  render() {
    const { values, errors } = this.state;

    return (
      <div className={css.wrapper}>
        <h1 className={css.title}>Регистрация</h1>
        <form className={css.form}>
          <input
            className={css.input}
            type="text"
            value={values.login}
            name="login"
            placeholder="Введите логин"
            onChange={this.inputChangeHandler}
          />
          {errors.login}
          <input
            className={css.input}
            type="password"
            value={values.password}
            name="password"
            placeholder="Введите пароль"
            onChange={this.inputChangeHandler}
          />
          {errors.password}
          <button className={css.btn} onClick={this.clickHandler} type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkAuth: TasksSelectors.checkAuth(state),
  };
};

const mapDispatchToProps = {
  checkAuth: TasksActionCreators.checkAuth,
};

export const RegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps)(Register);
