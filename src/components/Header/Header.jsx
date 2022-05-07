import css from "./header.module.css"
import { TasksSelectors} from "../../store"
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


 export const Header = () => {

  const checkAuth = useSelector(TasksSelectors.checkAuth)

    return (
        <div className={css.wrapper}>
          <ul className={css.list}>
            {["tasks", "about"].map((route) => (
              <li key={route}>
                <Link className={css.link} to={`/${route}`}>
                  {route}
                </Link>
              </li>
            ))}
          </ul>
          {checkAuth && <button className={css.btn}>Выйти</button>}
        </div>
    )
}

