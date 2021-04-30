import React, { useEffect, useState, useCallback } from 'react';
import { FiUsers } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { getUser } from '../ChatList/queries';
import { listUsers } from '../../graphql/queries';
import UsersListItem from '../../components/UsersListItem/UsersListItem';
import NavBar from '../../components/NavBar/NavBar';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './UsersList.scss';

const UsersList = ({ isAuthed, currentUserID, width }) => {
  const [chatRooms, setChatRooms] = useState(null);
  const [users, setUsers] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();
  const showPhoneNav = width <= 900 && navOpen;

  if (isAuthed === false) {
    history.push('/login');
  }

  const customFilter = useCallback((userToCheck) => {
    let roomExits = false;
    for (let i = 0; i < chatRooms.length; i += 1) {
      const firstUser = chatRooms[i].chatRoom.users.items[0].user;
      const secondUser = chatRooms[i].chatRoom.users.items[1].user;
      if (firstUser.id === currentUserID && secondUser.id === userToCheck.id) {
        roomExits = true;
      }
      if (firstUser.id === userToCheck.id && secondUser.id === currentUserID) {
        roomExits = true;
      }
    }
    if (!roomExits) {
      return true;
    }
    return false;
  }, [chatRooms]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const databaseUsers = await API.graphql(graphqlOperation(
          listUsers,
        ));
        const tempUsers = databaseUsers.data.listUsers.items
          .filter((user) => user.id !== currentUserID);

        const currentUserData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: currentUserID,
            },
          ),
        );

        if (chatRooms === null) {
          setChatRooms(currentUserData.data.getUser.chatRooms.items);
        }
        setUsers(tempUsers.filter(customFilter));
      } catch (e) {
        console.log('error: ', e);
      }
    };
    fetchUsers();
  }, [chatRooms]);

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
            {users.map((user) => <UsersListItem user={user} />)}
          </div>
        )}
      </div>
    </div>

  );
};

UsersList.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  currentUserID: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default UsersList;
