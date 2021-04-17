import React from 'react';
import PropTypes from 'prop-types';
import { RiChatForwardFill } from 'react-icons/ri';
import './UsersListItem.scss';

const UsersListItem = ({ user }) => {
  const onClick = () => {
    /* Will be implemented later to start
    a conversation with the user */
  };

  return (
    <div className="user-item-container">
      <h1>{ user.fullName }</h1>
      <RiChatForwardFill onClick={onClick} height="45px" />
    </div>
  );
};

UsersListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default UsersListItem;
