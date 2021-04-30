import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserProfile from '../../components/UserProfile/UserProfile';
import NavBar from '../../components/NavBar/NavBar';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './ProfilePage.scss';

const ProfilePage = ({ isAuthed, currentUser, width }) => {
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();
  const showPhoneNav = width <= 900 && navOpen;
  console.log('flflff: ', currentUser);
  if (isAuthed === false) {
    history.push('/login');
  }

  return (
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
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </div>

  );
};

ProfilePage.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    attributes: PropTypes.shape({
      sub: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
};

export default ProfilePage;
