import { CHAT_LIST_LOADED, USERS_LIST_LOADED } from './listTypes';

export const chatListLoaded = (chats) => ({
  type: CHAT_LIST_LOADED,
  payload: chats,
});

export const usersListLoaded = (users) => ({
  type: USERS_LIST_LOADED,
  payload: users,
});
