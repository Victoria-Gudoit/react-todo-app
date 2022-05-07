import React, { useState } from "react";
import css from "./register.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../store";

export const RegisterForm = () => {
  const [values, setValues] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({ login: "", password: "" });

  const dispatch = useDispatch();
  const checkAuth = () => dispatch(authAction.checkAuth());

  const inputChangeHandler = (event) => {
    setValues(() => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors(() => ({
      ...errors,
      [event.target.name]: "",
    }));
  };

  const clickHandler = (e) => {
    e.preventDefault();
    const isValid = values.login.length > 5 && values.password.length > 5;
    setErrors(() => ({
      login: values.login.length > 5 ? "" : "Логин не меньше 5 символов!",
      password:
        values.password.length > 5 ? "" : "Пароль не меньше 5 символов!",
    }));

    if (isValid) {
      checkAuth();
    }
  };

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
          onChange={inputChangeHandler}
        />
        {errors.login}
        <input
          className={css.input}
          type="password"
          value={values.password}
          name="password"
          placeholder="Введите пароль"
          onChange={inputChangeHandler}
        />
        {errors.password}
        <button className={css.btn} onClick={clickHandler} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
