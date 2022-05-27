import NavBar from './NavBar';
import React from 'react';
// import { Link } from 'react-router-dom';
// import { Switch } from "react-router-dom";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  function handlerClick() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={`header ${isOpen ? 'header_opened' : ''}`}>
      {/* <Switch> */}
        <div to="/sign-in" className="logo" />
      {/* </Switch> */}
      <NavBar {...props} 
              handlerClick={handlerClick} 
              isOpen={isOpen}/>
    </header>
  );
}

export default Header;