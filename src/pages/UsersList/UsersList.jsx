import React, { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAuthed } from '../../actions/userActions/userSelectors';
import { selectUsersList } from '../../actions/listActions/listSelectors';
import useWidth from '../../hooks/useWidth';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './UsersList.scss';

const UsersList = () => {
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();
  const width = useWidth();
  const showPhoneNav = width <= 900 && navOpen;
  const isAuthed = useSelector(selectAuthed);
  const users = useSelector(selectUsersList);

  if (isAuthed === false) {
    history.push('/login');
  }

  return (
    <div className="users-list-container">
      {width > 900 && (<NavBar activePage="users" />) }
      {showPhoneNav && (<NavBar width={width} setNavOpen={setNavOpen} activePage="users" />)}
      <div className="users-list">
        <div className="users-list-header">
          { width <= 900 && (
            <div role="button" aria-hidden="true" onClick={() => setNavOpen(true)} className="chat-list-menu">
              <MenuIcon />
            </div>
          )}
          <div className="header-mobile">
            <FiUsers />
            <h1>All Users</h1>
          </div>
        </div>
        {users === null ? (
          <div className="users-list-loading">
            <div className="users-list-loading-inner">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className="users-list-inner">
            {users.map((user) => <UsersListItem key={user.id} user={user} />)}
          </div>
        )}
      </div>
    </div>

  );
};

export default UsersList;
