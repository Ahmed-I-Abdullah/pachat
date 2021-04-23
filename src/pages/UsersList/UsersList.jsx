import React from 'react';
import { FiUsers } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import './UsersList.scss';

const UsersList = ({ isAuthed, users }) => {
  const history = useHistory();

  if (isAuthed === false) {
    history.push('/login');
  }

  return (
    <div className="users-list-container">
      <NavBar activePage="users" />
      <div className="users-list">
        <div className="users-list-header">
          <FiUsers />
          <h1>All Users</h1>
        </div>
        {users === null ? (
          <div className="users-list-loading">
            <div className="users-list-loading-inner">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className="users-list-inner">
            {users.map((user) => <UsersListItem user={user} />)}
          </div>
        )}
      </div>
    </div>

  );
};

UsersList.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default UsersList;
