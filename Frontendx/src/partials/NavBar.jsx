import React, { useContext } from 'react';
//import logo
import Logo from '../img/Logo.png';
//import link functionality
import { Link } from 'react-router-dom';
//import context from authentication
import { AuthContext } from '../context/authContext';

const NavBar = () => {
  //import current user from context
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to={'/'}>
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=life">
            <h6>LIFE</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=sports">
            <h6>SPORTS</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>HEALTH</h6>
          </Link>
          <span>{currentUser?.username} </span>
          {currentUser ? (
            <Link className="link" to="/">
              <span onClick={logout}>Logout</span>
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            {currentUser ? (
              <Link to="/write" className="link">
                Write
              </Link>
            ) : (
              <Link to="/login" className="link">
                Write
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
