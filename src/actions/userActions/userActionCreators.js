import { LOGIN, SIGNOUT } from './userTypes';

export const userLoggedIn = (user) => ({ type: LOGIN, payload: user });
export const userSignedOut = () => ({ type: SIGNOUT });
