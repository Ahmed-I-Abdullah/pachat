import { CHAT_LIST_LOADED, USERS_LIST_LOADED, LIST_SIGNED_OUT } from './listTypes';

export const chatListLoaded = (chats) => ({
  type: CHAT_LIST_LOADED,
  payload: chats,
});

export const usersListLoaded = (users) => ({
  type: USERS_LIST_LOADED,
  payload: users,
});

export const listSignedOut = () => ({
  type: LIST_SIGNED_OUT,
});
