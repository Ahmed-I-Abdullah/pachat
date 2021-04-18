import React from 'react';
import { useParams } from 'react-router-dom';
import profilePicture from '../../assets/profilePicture.png';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import NavBar from '../../components/NavBar/NavBar';
import MessageInput from '../../components/MessageInput/MessageInput';
import './ChatRoom.scss';
import chats from '../../data/chats';

const ChatRoom = () => {
  const { conversationId, conversationName } = useParams();
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
