import React, { useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import './ChatList.scss';
import rooms from '../../data/rooms';

const ChatList = () => {
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

export default ChatList;
