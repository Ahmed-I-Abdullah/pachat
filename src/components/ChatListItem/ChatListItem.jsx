import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ChatListItem.scss';

const ChatListItem = ({ roomInfo }) => {
  const secondUser = roomInfo.users[1];

  return (
    <div className="chat-list-item">
      <button type="submit" className="chat-list-button"><h2>{ secondUser.fullName }</h2></button>
      <Link className="chat-list-link" to={`conversation/${roomInfo.id}/${secondUser.fullName}`}>
        <h2>Go to Chat!</h2>
      </Link>
    </div>
  );
};

ChatListItem.propTypes = {
  roomInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        status: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
};

export default ChatListItem;
