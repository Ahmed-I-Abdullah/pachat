import { LOGIN, SIGNOUT } from '../actions/userActions/userTypes';

const initialState = {
  isAuthed: false,
  currentUser: null,
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
