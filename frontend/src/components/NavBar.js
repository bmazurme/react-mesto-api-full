import { Route, Switch } from "react-router-dom";
import NavItem from './NavItem';
import { config } from "../utils/config";

function NavBar(props) {
  return(
    <>
      <ul
        onClick={props.handlerClick} 
        className={`navbar ${props.isOpen 
          ? 'navbar_opened' 
          : ''}`}
      >
        <Switch>
          <Route path={`/${config.ROOT_URL}/sign-in`}>
            <NavItem
              to={`/${config.ROOT_URL}/sign-up`}
              value="Регистрация"
              active="active"
            />
          </Route>
          <Route path={`/${config.ROOT_URL}/sign-up`}>
            <NavItem
              to={`/${config.ROOT_URL}/sign-in`}
              value="Войти"
              active="active"
            />
          </Route>
          <Route exact path={`/${config.ROOT_URL}`}>
            <NavItem
              to={`/${config.ROOT_URL}`}
              value={props.email}
              onClick={()=>console.log('go to profile')}
              active="active"
            />
            <NavItem
              to={`/${config.ROOT_URL}/sign-in`}
              value="Выйти"
              onClick={props.onSignOut}
            />
          </Route>
        </Switch>
      </ul>
      <button
        onClick={props.handlerClick} 
        className={`navbar__btn ${props.isOpen 
          ? 'navbar__btn_opened'
          : ''}`} 
      />
    </>
  );
}

export default NavBar;