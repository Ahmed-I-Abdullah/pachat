import React, { useEffect, useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAuthed, selectUser } from '../../actions/userActions/userSelectors';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './ChatList.scss';
import { getUser } from './queries';

const ChatList = ({ width }) => {
  const [chatRooms, setChatRooms] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();
  const showPhoneNav = width <= 900 && navOpen;
  const isAuthed = useSelector(selectAuthed);
  const currentUser = useSelector(selectUser);

  if (isAuthed === false) {
    history.push('/login');
  }

  const fetchChatRooms = async () => {
    try {
      const currentUserData = await API.graphql(
        graphqlOperation(
          getUser, {
            id: currentUser.attributes.sub,
          },
        ),
      );

      if (currentUserData.data.getUser === null) {
        setChatRooms([]);
      }
      if (chatRooms === null) {
        setChatRooms(currentUserData.data.getUser.chatRooms.items.sort(
          (a, b) => {
            if (new Date(b.chatRoom.messages.items.pop().updatedAt)
    - new Date(a.chatRoom.messages.items.pop().updatedAt) > 0) {
              return 1;
            }
            return -1;
          },
        ));
      }
    } catch (e) {
      console.log('Chat rooms error in ChatList is: ', e);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <div className="chat-list-container">
      {width > 900 && (<NavBar activePage="messages" />) }
      {showPhoneNav && (<NavBar width={width} setNavOpen={setNavOpen} activePage="messages" />)}
      <div className="chat-list">
        <div className="chat-list-header">
          { width <= 900 && (
            <div role="button" aria-hidden="true" onClick={() => setNavOpen(true)} className="chat-list-menu">
              <MenuIcon />
            </div>
          )}
          <div className="header-mobile">
            <AiFillWechat />
            <h1>All Messages</h1>
          </div>
        </div>
        {chatRooms === null ? (
          <div className="chat-list-loading">
            <div className="chat-list-loading-inner">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className="chat-list-inner">
            {chatRooms.map((room) => (
              <ChatListItem
                key={room.chatRoom.id}
                roomInfo={room.chatRoom}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

ChatList.propTypes = {
  width: PropTypes.number.isRequired,
};

export default ChatList;
