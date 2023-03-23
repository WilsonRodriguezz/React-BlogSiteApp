import React from 'react';
//import logo
import Logo from '../img/Logo.png';

const Footer = () => {
  return (
    <div className='container'>
        <footer className='footer'>
            <img src={Logo} alt="" />
            <span>Made with ♥ and <b>React.js</b>.</span>
        </footer>
    </div>
  
  );
}

export default Footer
