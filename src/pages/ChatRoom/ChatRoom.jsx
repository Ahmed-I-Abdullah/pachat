import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import profilePicture from '../../assets/profilePicture.png';
import ChatMessage from '../../components/ChatMessage/ChatMessage';

import NavBar from '../../components/NavBar/NavBar';
import MessageInput from '../../components/MessageInput/MessageInput';
import './ChatRoom.scss';
import chats from '../../data/chats';

const ChatRoom = () => {
  const { conversationId, conversationName } = useParams();

  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  async function authenticated() {
    return Auth.currentAuthenticatedUser()
      .then(() => { setIsAuthenticated(true); })
      .catch(() => { setIsAuthenticated(false); });
  }
  authenticated();
  if (isAuthenticated === false) {
    history.push('/login');
  }
  return (
    <div className="chat-room-container">
      <NavBar activePage="" />
      <div className="chat-room">
        <div className="chat-room-header">
          <img src={profilePicture} alt="user avatar" />
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

export default ChatRoom;
