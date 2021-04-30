import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API, graphqlOperation } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { getChatRoom, getUser } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import NavBar from '../../components/NavBar/NavBar';
import MessageInput from '../../components/MessageInput/MessageInput';
import MenuIcon from '../../components/MenuIcon/MenuIcon';
import './ChatRoom.scss';

const ChatRoom = ({ isAuthed, currentUserID, width }) => {
  const { roomId, conversationId, conversationName } = useParams();
  const [roomMessages, setRoomMessages] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const showPhoneNav = width <= 900 && navOpen;

  const history = useHistory();
  if (isAuthed === false) {
    history.push('/login');
  }

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'room-chats-1',
    });
  };

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

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage),
    ).subscribe({
      next: (event) => {
        setRoomMessages([...roomMessages, event.value.data.onCreateMessage]);
        scrollToBottom();
      },
      error: (error) => console.log('subscribtion error: ', error),
    });

    return () => subscription.unsubscribe();
  }, [roomMessages]);

  return (
    <div className="chat-room-container">
      {width > 900 && (<NavBar activePage="" />) }
      {showPhoneNav && (<NavBar width={width} setNavOpen={setNavOpen} activePage="" />)}
      <div className="chat-room">
        <div className="input-adjust-one">
          <div className="chat-room-header">
            { width <= 900 && (
              <div role="button" aria-hidden="true" onClick={() => setNavOpen(true)} className="chat-room-menu">
                <MenuIcon />
              </div>
            )}
            <div className="header-mobile">
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
          </div>
          {roomMessages === null ? (
            <div className="chat-room-loading">
              <div className="chat-room-loading-inner">
                <CircularProgress />
              </div>
            </div>
          ) : (
            <div id="room-chats-1" className="chat-room-inner">
              { roomMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  secondUserID={conversationId}
                />
              ))}
              { scrollToBottom() }
            </div>
          )}
        </div>
        <div className="input-adjust-two">
          { currentUserID !== null && (
            <MessageInput
              roomID={roomId}
              currentUserID={currentUserID}
            />
          ) }
        </div>
      </div>
    </div>
  );
};

ChatRoom.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  currentUserID: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChatRoom;
