import React from 'react';
import { AiFillWechat } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import './ChatList.scss';
import rooms from '../../data/rooms';

const ChatList = ({ isAuthed }) => {
  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  return (
    <div className="chat-list-container">
      <NavBar activePage="messages" />
      <div className="chat-list">
        <div className="chat-list-header">
          <AiFillWechat />
          <h1>All Messages</h1>
        </div>
        <div className="chat-list-inner">
          {rooms.map((room) => <ChatListItem roomInfo={room} />)}
        </div>
      </div>
    </div>

  );
};

ChatList.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default ChatList;
