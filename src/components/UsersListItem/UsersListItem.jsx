import React from 'react';
import PropTypes from 'prop-types';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import { fetchChatRooms } from '../../middleware/listMiddleWare';
import './UsersListItem.scss';

const UsersListItem = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClick = async () => {
    try {
      const newChatRoomObject = await API.graphql(graphqlOperation(createChatRoom, {
        input: {

        },
      }));

      const newChatRoom = newChatRoomObject.data.createChatRoom;
      const currentUser = await Auth.currentAuthenticatedUser();

      await API.graphql(graphqlOperation(createChatRoomUser, {
        input: {
          userID: user.id, chatRoomID: newChatRoom.id,
        },
      }));

      await API.graphql(graphqlOperation(createChatRoomUser, {
        input: {
          userID: currentUser.attributes.sub, chatRoomID: newChatRoom.id,
        },
      }));

      history.push(`conversation/${newChatRoom.id}/${user.id}/${user.fullName}`);
      dispatch(fetchChatRooms);
    } catch (e) {
      console.log('Room creation error: ', e);
    }
  };

  return (
    <div className="user-item-container">
      <div className="user-item-profile">
        <img src={user.imageUrl} alt="user avatar" />
        <div className="user-item-data-div">
          <h2 id="user-list-name">{ user.fullName }</h2>
          <h4>{ user.status }</h4>
        </div>
      </div>
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
