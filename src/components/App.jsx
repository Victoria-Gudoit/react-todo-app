import { Switch, Route, Redirect} from "react-router-dom";
import { About } from "./About/About";
import { Tasks } from "./Tasks/Tasks";
import css from "./style.module.css";
import { RegisterForm } from "./Register/RegisterForm";
import { TasksSelectors } from "../store";
import React from "react";
import { Task } from "./Task/Task";
import {Header} from "./Header/Header"
import { useSelector } from "react-redux";

export const App = () => {

  const checkAuth = useSelector(TasksSelectors.checkAuth)  

    return (
      <div className={css.main}>
      <Header/>
        <Switch>
          <Route path="/register" exact>
            <RegisterForm />
          </Route>
          {!checkAuth && <Redirect to="/register" />}
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/task/:id" exact>
            <Task />
          </Route>
          <Route path="/tasks" exact>
            <Tasks />
          </Route>
          <Redirect to="/tasks" />
        </Switch>
      </div>
    )
}


