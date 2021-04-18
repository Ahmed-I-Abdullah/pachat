import React from 'react';
import { AiFillWechat } from 'react-icons/ai';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import './ChatList.scss';
import rooms from '../../data/rooms';

const ChatList = () => (
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

export default ChatList;
