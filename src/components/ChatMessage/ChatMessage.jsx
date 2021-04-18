import React from 'react';
import PropTypes from 'prop-types';
import './ChatMessage.scss';

const ChatMessage = ({ message }) => {
  const isMyMessage = () => message.user.id === 'u990';

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
    content: PropTypes.string.isRequired,
    creationTime: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ChatMessage;
