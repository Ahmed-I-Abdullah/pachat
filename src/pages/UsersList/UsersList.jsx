import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import './UsersList.scss';
import { listUsers } from '../../graphql/queries';
import { getUser } from '../ChatList/queries';

const UsersList = ({ isAuthed }) => {
  const [chatRooms, setChatRooms] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let currentUser = null;

  const customFilter = (userToCheck) => {
    let roomExits = false;
    for (let i = 0; i < chatRooms.length; i += 1) {
      const firstUser = chatRooms[i].chatRoom.users.items[0].user;
      const secondUser = chatRooms[i].chatRoom.users.items[1].user;
      if (firstUser.id === currentUser.attributes.sub && secondUser.id === userToCheck.id) {
        roomExits = true;
      }
      if (firstUser.id === userToCheck.id && secondUser.id === currentUser.attributes.sub) {
        roomExits = true;
      }
      console.log('first user is: ', firstUser);
      console.log('second user is: ', secondUser);
    }
    if (!roomExits) {
      return true;
    }
    return false;
  };

  if (isAuthed === false) {
    history.push('/login');
  }
  let fetchUsers = () => {};

  useEffect(() => {
    fetchUsers = async () => {
      currentUser = await Auth.currentAuthenticatedUser();
      try {
        const databaseUsers = await API.graphql(graphqlOperation(
          listUsers,
        ));
        const tempUsers = databaseUsers.data.listUsers.items
          .filter((user) => user.id !== currentUser.attributes.sub);

        const currentUserData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: currentUser.attributes.sub,
            },
          ),
        );

        console.log(currentUserData);
        if (chatRooms === null) {
          setChatRooms(currentUserData.data.getUser.chatRooms.items);
        }
        setUsers(tempUsers.filter(customFilter));
        if (chatRooms !== null) {
          setLoading(false);
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
    };
    fetchUsers();
  }, [chatRooms]);

  return (
    <div className="users-list-container">
      <NavBar activePage="users" />
      <div className="users-list">
        <div className="users-list-header">
          <FiUsers />
          <h1>All Users</h1>
        </div>
        {loading ? (
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
};

export default UsersList;
