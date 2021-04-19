import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import NavBar from '../../components/NavBar/NavBar';
import MessageInput from '../../components/MessageInput/MessageInput';
import './ChatRoom.scss';
import chats from '../../data/chats';

const ChatRoom = ({ isAuthed }) => {
  const { conversationId, conversationName } = useParams();

  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  return (
    <div className="chat-room-container">
      <NavBar activePage="" />
      <div className="chat-room">
        <div className="chat-room-header">
          <img
            src={chats.filter((chat) => chat.id === conversationId)[0]
              .users[1].imageUrl}
            alt="user avatar"
          />
          <h1>{conversationName}</h1>
        </div>
        <div className="chat-room-inner">
          {chats.filter((chat) => chat.id === conversationId)[0]
            .messages.map((message) => <ChatMessage message={message} />)}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};

ChatRoom.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default ChatRoom;
