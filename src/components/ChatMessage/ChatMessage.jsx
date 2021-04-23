import React from 'react';
import PropTypes from 'prop-types';
import './ChatMessage.scss';

const ChatMessage = ({ message, secondUserID }) => {
  const isMyMessage = () => message.userID !== secondUserID;

  return (
    <div className="message">
      <div className={`message-${isMyMessage() ? 'mine' : 'friend'}`}>
        <p className="message-content">{message.content}</p>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    chatRoomID: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
  }).isRequired,
  secondUserID: PropTypes.string.isRequired,
};

export default ChatMessage;
