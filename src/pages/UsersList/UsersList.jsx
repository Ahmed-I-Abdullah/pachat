import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import './UsersList.scss';
import { listUsers } from '../../graphql/queries';

const UsersList = ({ isAuthed }) => {

  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const databaseUsers = await API.graphql(graphqlOperation(
          listUsers,
        ));
        setUsers(databaseUsers.data.listUsers.items);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    };

    fetchUsers();
  }, []);

  return (
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
};

UsersList.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default UsersList;
