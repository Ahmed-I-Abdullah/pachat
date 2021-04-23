import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ChatListItem.scss';

const ChatListItem = ({ roomInfo }) => {
  const [secondUser, setSecondUser] = useState(null);

  useEffect(() => {
    const getFriendUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();

      if (roomInfo.users.items[0].user.id === currentUser.attributes.sub) {
        setSecondUser(roomInfo.users.items[1].user);
      } else {
        setSecondUser(roomInfo.users.items[0].user);
      }
    };
    getFriendUser();
  }, [secondUser]);

  return secondUser && (
  <div className="chat-list-item">
    <button type="submit" className="chat-list-button">
      <img src={secondUser.imageUrl} alt="user avatar" />
      <div className="chat-item-data-div">
        <h2 id="chat-list-name">{ secondUser.fullName }</h2>
        <h4 id="chat-list-status">{ secondUser.status }</h4>
      </div>
    </button>
    <Link className="chat-list-link" to={`conversation/${roomInfo.id}/${secondUser.id}/${secondUser.fullName}`}>
      <h2>Go to Chat!</h2>
    </Link>
  </div>
  );
};

ChatListItem.propTypes = {
  roomInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    users: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            imageUrl: PropTypes.string,
            status: PropTypes.string,
          }),
        }),
      ).isRequired,
    }),
  }).isRequired,
};

export default ChatListItem;
