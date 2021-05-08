import React, { useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAuthed } from '../../actions/userActions/userSelectors';
import { selectChatList } from '../../actions/listActions/listSelectors';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './ChatList.scss';
import useWidth from '../../hooks/useWidth';

const ChatList = () => {
  const [navOpen, setNavOpen] = useState(false);
  const width = useWidth();
  const history = useHistory();
  const isAuthed = useSelector(selectAuthed);
  const chatRooms = useSelector(selectChatList);
  const showPhoneNav = width <= 900 && navOpen;
  console.log('current is authed: ', isAuthed);

  if (isAuthed === false || isAuthed === undefined) {
    history.push('/login');
  }

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

export default ChatList;
