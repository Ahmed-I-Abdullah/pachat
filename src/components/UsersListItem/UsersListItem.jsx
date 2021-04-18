import React from 'react';
import PropTypes from 'prop-types';
import { AiFillPlusCircle } from 'react-icons/ai';
import './UsersListItem.scss';

const UsersListItem = ({ user }) => {
  const onClick = () => {
    /* Will be implemented later to start
    a conversation with the user */
  };

  return (
    <div className="user-item-container">
      <h2>{ user.fullName }</h2>
      <AiFillPlusCircle onClick={onClick} height="45px" />
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
