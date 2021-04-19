import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import './UsersList.scss';
import { listUsers } from '../../graphql/queries';

const UsersList = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [users, setUsers] = useState([]);

  async function authenticated() {
    return Auth.currentAuthenticatedUser()
      .then(() => { setIsAuthenticated(true); })
      .catch(() => { setIsAuthenticated(false); });
  }

  authenticated();
  if (isAuthenticated === false) {
    history.push('/login');
  }

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

export default UsersList;
