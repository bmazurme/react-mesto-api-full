import logo from '../images/logo.svg';
import NavBar from './NavBar';
import React from 'react';

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  function handlerClick() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={`header ${isOpen ? 'header_opened' : ''}`}>
        <a href='/' 
           className="logo" 
           src={logo} 
           alt="Логотип Место">
        </a>
        <NavBar {...props} 
                handlerClick={handlerClick} 
                isOpen={isOpen}/>
    </header>
  );
}

export default Header;