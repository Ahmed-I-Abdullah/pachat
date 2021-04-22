import React, { useEffect, useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import './ChatList.scss';
import { getUser } from './queries';

const ChatList = ({ isAuthed }) => {
  const [chatRooms, setChatRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();

        const currentUserData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: currentUser.attributes.sub,
            },
          ),
        );
        if (chatRooms === null) {
          setChatRooms(currentUserData.data.getUser.chatRooms.items);
        }
        console.log('nummm');
      } catch (e) {
        console.log('chat rooms error is: ', e);
      }
    };
    fetchChatRooms();
    if (chatRooms !== null) {
      setLoading(false);
    }
  }, [chatRooms]);

  return (
    <div className="chat-list-container">
      <NavBar activePage="messages" />
      <div className="chat-list">
        <div className="chat-list-header">
          <AiFillWechat />
          <h1>All Messages</h1>
        </div>
        {loading ? (
          <div className="chat-list-loading">
            <div className="chat-list-loading-inner">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className="chat-list-inner">
            {chatRooms.map((room) => <ChatListItem roomInfo={room.chatRoom} />)}
          </div>
        )}
      </div>
    </div>

  );
};

ChatList.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default ChatList;
