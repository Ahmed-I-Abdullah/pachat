import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthed } from '../../actions/userActions/userSelectors';
import UserProfile from '../../components/UserProfile/UserProfile';
import NavBar from '../../components/NavBar/NavBar';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './ProfilePage.scss';

const ProfilePage = ({ width }) => {
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();
  const showPhoneNav = width <= 900 && navOpen;
  const isAuthed = useSelector(selectAuthed);
  if (isAuthed === false) {
    history.push('/login');
  }

  return isAuthed && (
    <div className="profile-page-container">
      {width > 900 && (<NavBar activePage="profile" />) }
      {showPhoneNav && (<NavBar width={width} setNavOpen={setNavOpen} activePage="profile" />)}
      <div className="profile-page">
        <div className="profile-page-header">
          { width <= 900 && (
            <div role="button" aria-hidden="true" onClick={() => setNavOpen(true)} className="user-profile-menu">
              <MenuIcon />
            </div>
          )}
          <div className="profile-header-mobile">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="profile-page-inner">
          <UserProfile />
        </div>
      </div>
    </div>

  );
};

ProfilePage.propTypes = {
  currentUser: PropTypes.shape({
    attributes: PropTypes.shape({
      sub: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
};

export default ProfilePage;
