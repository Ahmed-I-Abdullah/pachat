import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { getChatRoom, getUser } from '../../graphql/queries';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import NavBar from '../../components/NavBar/NavBar';
import MessageInput from '../../components/MessageInput/MessageInput';
import './ChatRoom.scss';

const ChatRoom = ({ isAuthed }) => {
  const { roomId, conversationId, conversationName } = useParams();
  const [roomMessages, setRoomMessages] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const currentChatRoom = await API.graphql(
          graphqlOperation(
            getChatRoom, {
              id: roomId,
            },
          ),
        );

        const otherUser = await API.graphql(
          graphqlOperation(
            getUser, {
              id: conversationId,
            },
          ),
        );

        if (currentUser === null) {
          setCurrentUser(
            await Auth.currentAuthenticatedUser(),
          );
        }

        if (roomMessages === null) {
          setRoomMessages(currentChatRoom.data.getChatRoom.messages.items);
        }

        if (secondUser === null) {
          setSecondUser(otherUser.data.getUser);
        }
      } catch (e) {
        console.log('Chat room error: ', e);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="chat-room-container">
      <NavBar activePage="" />
      <div className="chat-room">
        <div className="input-adjust-one">
          <div className="chat-room-header">
            {secondUser === null ? (
              <img
                src="https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8"
                alt="user avatar"
              />
            ) : (
              <img
                src={secondUser.imageUrl}
                alt="user avatar"
              />
            )}
            <h1>{conversationName}</h1>
          </div>
          {roomMessages === null ? (
            <div className="chat-room-loading">
              <div className="chat-room-loading-inner">
                <CircularProgress />
              </div>
            </div>
          ) : (
            <div className="chat-room-inner">
              { roomMessages.map((message) => (
                <ChatMessage
                  message={message}
                  secondUserID={conversationId}
                />
              ))}
            </div>
          )}
        </div>
        <div className="input-adjust-two">
          { currentUser !== null && (
            <MessageInput
              roomID={roomId}
              currentUserID={currentUser.attributes.sub}
            />
          ) }
        </div>
      </div>
    </div>
  );
};

ChatRoom.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
};

export default ChatRoom;
