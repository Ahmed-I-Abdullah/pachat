import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { TiMessages } from 'react-icons/ti';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { resetUser } from '../../localStorage';
import { userSignedOut } from '../../actions/userActions/userActionCreators';
import { listSignedOut } from '../../actions/listActions/listActionCreators';
import './NavBar.scss';
import logo from '../../assets/darkLogo.svg';

const NavBar = ({ activePage, width, setNavOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  async function signOut() {
    try {
      await Auth.signOut();
      resetUser();
      dispatch(userSignedOut);
      dispatch(listSignedOut);
      window.location.reload();
      history.push('/login');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <div className="nav-container">
      <div className="logo-div">
        <div className="inner-logo-div">
          {width <= 900 && (<div className="close-icon"><AiFillCloseCircle onClick={() => setNavOpen(false)} /></div>)}
          <div className="logo-title">
            <img className="nav-logo" src={logo} alt="logo" />
            <h1 className="title">Pachat</h1>
          </div>
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
  width: PropTypes.number,
  setNavOpen: PropTypes.func,
};

NavBar.defaultProps = {
  width: 1000,
  setNavOpen: null,
};

export default NavBar;
