import React, { useEffect, useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
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
import useWidth from '../../hooks/useWidth';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const width = useWidth();
  const history = useHistory();
  const isAuthed = useSelector(selectAuthed);
  const currentUser = useSelector(selectUser);
  const showPhoneNav = width <= 900 && navOpen;

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

export default ChatList;
