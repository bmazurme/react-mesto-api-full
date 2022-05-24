import { Link } from 'react-router-dom';

function NavItem(props) {
  return(
    <li className='navbar__item'>
      <Link
        to={props.to} 
        onClick={props.onClick}
        className={`navbar__link ${props.active 
          ? 'navbar__link_active'
          : ''}`}>
        {props.value}
      </Link>
    </li>
  );
}

export default NavItem;