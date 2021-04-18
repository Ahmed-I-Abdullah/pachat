import React from 'react';
import { FiUsers } from 'react-icons/fi';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import './UsersList.scss';
import users from '../../data/users';

const UsersList = () => (
  <div className="users-list-container">
    <NavBar activePage="users" />
    <div className="users-list">
      <div className="users-list-header">
        <FiUsers />
        <h1>All Users</h1>
      </div>
      <div className="users-list-inner">
        {users.map((user) => <UsersListItem user={user} />)}
      </div>
    </div>
  </div>

);

export default UsersList;
