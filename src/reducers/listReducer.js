import { CHAT_LIST_LOADED, USERS_LIST_LOADED, LIST_SIGNED_OUT } from '../actions/listActions/listTypes';

const initialState = {
  chats: null,
  users: null,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LIST_LOADED:
      return {
        ...state,
        chats: action.payload,
      };
    case USERS_LIST_LOADED:
      return {
        ...state,
        users: action.payload,
      };
    case LIST_SIGNED_OUT:
      return {
        ...state,
        chats: null,
        users: null,
      };
    default:
      return state;
  }
};

export default listReducer;
