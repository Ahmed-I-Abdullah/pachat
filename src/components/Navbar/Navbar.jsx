import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { TiMessages } from 'react-icons/ti';

import { Auth } from 'aws-amplify';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import './NavBar.scss';

import logo from '../../assets/darkLogo.svg';

const NavBar = ({ activePage }) => {
  const history = useHistory();
  async function signOut() {
    try {
      await Auth.signOut();
      history.push('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div className="nav-container">
      <div className="logo-div">
        <div className="inner-logo-div">
          <img className="nav-logo" src={logo} alt="logo" />
          <h1 className="title">Pachat</h1>
        </div>
      </div>
      <div className="signout-adjust">
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

        <button type="submit" className="signout-div" onClick={signOut}>
          <FaSignOutAlt height="45px" />
          <h1>Sign Out</h1>
        </button>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default NavBar;
