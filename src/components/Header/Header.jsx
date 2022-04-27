import css from "./header.module.css"
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { TasksSelectors} from "../../store"
import React from "react";


 const HeaderOriginal = (props) => {
    const { checkAuth } = props;
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

const mapStateToProps = (state) => {
    return {
      checkAuth: TasksSelectors.checkAuth(state),
    };
  };
  
  export const Header = compose(withRouter, connect(mapStateToProps))(HeaderOriginal);
