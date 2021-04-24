import React, { useEffect, useState } from 'react';
import { AiFillWechat } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import ChatListItem from '../../components/ChatListItem/ChatListItem';
import NavBar from '../../components/NavBar/NavBar';
import './ChatList.scss';
import { getUser } from './queries';
import { onCreateMessage } from '../../graphql/subscriptions';

const ChatList = ({ isAuthed, currentUserID }) => {
  const [chatRooms, setChatRooms] = useState(null);

  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  const fetchChatRooms = async () => {
    try {
      const currentUserData = await API.graphql(
        graphqlOperation(
          getUser, {
            id: currentUserID,
          },
        ),
      );
      if (chatRooms === null) {
        setChatRooms(currentUserData.data.getUser.chatRooms.items);
      }
    } catch (e) {
      console.log('Chat rooms error in ChatList is: ', e);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe(
      {
        next: ({ provider, value }) => console.log({ provider, value }),
        error: (error) => console.warn(error),
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="chat-list-container">
      <NavBar activePage="messages" />
      <div className="chat-list">
        <div className="chat-list-header">
          <AiFillWechat />
          <h1>All Messages</h1>
        </div>
        {chatRooms === null ? (
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
  currentUserID: PropTypes.string.isRequired,
};

export default ChatList;
