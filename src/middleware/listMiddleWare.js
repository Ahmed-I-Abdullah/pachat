import { API, graphqlOperation } from 'aws-amplify';
import { chatListLoaded, usersListLoaded } from '../actions/listActions/listActionCreators';
import { getUser, listUsers } from '../graphql/queries';

export const fetchChatRooms = async (dispatch, getState) => {
  try {
    const currentUserData = await API.graphql(
      graphqlOperation(
        getUser, {
          id: getState().users.currentUser.attributes.sub,
        },
      ),
    );

    if (currentUserData.data.getUser === null) {
      dispatch(chatListLoaded([]));
    }

    dispatch(chatListLoaded(currentUserData.data.getUser.chatRooms.items.sort(
      (a, b) => {
        if (new Date(b.chatRoom.messages.items.pop().updatedAt)
- new Date(a.chatRoom.messages.items.pop().updatedAt) > 0) {
          return 1;
        }
        return -1;
      },
    )));
  } catch (err) {
    console.log('Error fetching chats in list middleware, : ', err);
  }
};

export const fetchUsers = async (dispatch, getState) => {
  const chatRooms = getState().lists.chats;
  const currentUserID = getState().users.currentUser.attributes.sub;
  const customFilter = (userToCheck) => {
    let roomExits = false;
    for (let i = 0; i < chatRooms.length; i += 1) {
      const firstUser = chatRooms[i].chatRoom.users.items[0].user;
      const secondUser = chatRooms[i].chatRoom.users.items[1].user;
      if (firstUser.id === currentUserID && secondUser.id === userToCheck.id) {
        roomExits = true;
      }
      if (firstUser.id === userToCheck.id && secondUser.id === currentUserID) {
        roomExits = true;
      }
    }
    if (!roomExits) {
      return true;
    }
    return false;
  };
  try {
    const databaseUsers = await API.graphql(graphqlOperation(
      listUsers,
    ));
    const tempUsers = databaseUsers.data.listUsers.items
      .filter((user) => user.id !== currentUserID);

    dispatch(usersListLoaded(tempUsers.filter(customFilter)));
  } catch (err) {
    console.log('Error fetching users in list middleware, : ', err);
  }
};
