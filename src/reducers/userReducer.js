import { LOGIN, SIGNOUT } from '../actions/userActions/userTypes';
import { loadUser } from '../localStorage';

const persistedUser = loadUser() ? JSON.parse(loadUser()) : undefined;
console.log('persisted user is: ', persistedUser);
const initialState = {
  isAuthed: persistedUser ? persistedUser.isAuthed : false,
  currentUser: persistedUser ? persistedUser.currentUser : null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthed: true,
        currentUser: action.payload,
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthed: false,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
