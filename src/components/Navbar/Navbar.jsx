import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { TiMessages } from 'react-icons/ti';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import './Navbar.scss';

import logo from '../../assets/darkLogo.svg';

const Navbar = ({ activePage }) => (
  <div className="container">
    <div className="logo-div">
      <div className="inner-logo-div">
        <img className="nav-logo" src={logo} alt="logo" />
        <h1 className="title">Pachat</h1>
      </div>
    </div>

    <nav className="nav-div">
      <NavLink
        to="/"
        className={`nav-box-${activePage === 'messages' ? 'active' : 'normal'}`}
      >
        <TiMessages height="45px" />
        <h1>Messages</h1>
      </NavLink>

      <NavLink
        to="/users"
        className={`nav-box-${activePage === 'users' ? 'active' : 'normal'}`}
      >
        <FaUsers height="45px" />
        <h1>Users</h1>
      </NavLink>

      <NavLink
        to="/profile"
        className={`nav-box-${activePage === 'profile' ? 'active' : 'normal'}`}
      >
        <CgProfile height="45px" />
        <h1>Profile</h1>
      </NavLink>
    </nav>

    <div className="signout-div">
      <FaSignOutAlt height="45px" />
      <h1>Sign Out</h1>
    </div>
  </div>
);

Navbar.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default Navbar;
