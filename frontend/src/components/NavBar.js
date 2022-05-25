import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";

function NavBar(props) {
  return(
    <>
      <ul onClick={props.handlerClick} 
         className={`navbar ${props.isOpen 
                              ? 'navbar_opened' 
                              : ''}`}>
        <Switch>
          <Route exact path="/sign-in">
            <li className='navbar__item'>
              <Link to="/sign-up" 
                    className="navbar__link 
                               navbar__link_active">
                Регистрация
              </Link>
            </li>
          </Route>

          <Route exact path="/sign-up">
            <li className='navbar__item'>
              <Link to="/sign-in" 
                    className="navbar__link 
                               navbar__link_active">
                Войти
              </Link>
            </li>
          </Route>

          <Route exact path="/">
            <li className='navbar__item'>
              <Link to='/' 
                    className="navbar__link 
                               navbar__link_active" 
                    onClick={()=>console.log('go to profile')}>
                {props.email}
              </Link>
            </li>

            <li className='navbar__item'>
              <Link to='/sign-in' 
                    className="navbar__link" 
                    onClick={props.onSignOut}>
                Выйти
              </Link>
            </li>
          </Route>

        </Switch>
      </ul>

      <button onClick={props.handlerClick} 
              className={`navbar__btn ${props.isOpen 
                                        ? 'navbar__btn_opened'
                                        : ''}`} />
    </>
  );
}

export default NavBar;