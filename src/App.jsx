import React, { useEffect, useState } from 'react';
import {
  Switch, Route, BrowserRouter as Router,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import ChatList from './pages/ChatList/ChatList';
import UsersList from './pages/UsersList/UsersList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { selectAuthed } from './actions/userActions/userSelectors';
import signInAndUpdateUser from './middleware/userMiddleWare';
import { fetchChatRooms } from './middleware/listMiddleWare';
import useWidth from './hooks/useWidth';

function App() {
  const isAuthed = useSelector(selectAuthed);
  const width = useWidth();
  const dispatch = useDispatch();
  const [styles, setStyles] = useState({
    borderRadius: '50px',
    position: 'absolute',
    top: '4vh',
    display: 'flex',
    overflow: 'auto',
    height: '90vh',
    width: '90%',
    marginLeft: '4%',
    marginRight: '4%',
    boxShadow: '8px 8px 8px 6px #D9D2D2',
    border: '10px solid var(--violet-red)',
  });
  if (isAuthed) {
    window.onload = dispatch(fetchChatRooms);
  }

  useEffect(() => {
    if (width <= 900) {
      setStyles({
        minHeight: '100vh',
        overflow: 'auto',
      });
    } else if (!isAuthed) {
      setStyles({});
    } else {
      setStyles({
        borderRadius: '50px',
        position: 'absolute',
        top: '4vh',
        display: 'flex',
        overflow: 'auto',
        height: '90vh',
        width: '90%',
        marginLeft: '4%',
        marginRight: '4%',
        boxShadow: '8px 8px 8px 6px #D9D2D2',
        border: '10px solid var(--violet-red)',
      });
    }
  }, [width]);

  useEffect(() => {
    const updateUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          console.log('I am in');
          dispatch(signInAndUpdateUser(user));
        })
        .catch((err) => console.log('updating user in App error: ', err));
    };
    updateUser();
  });

  return (
    <div
      style={styles}
      className="App"
    >
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <ChatList />
            )}
          />
          <Route
            path="/users"
            exact
            render={() => (
              <UsersList />
            )}
          />
          <Route
            path="/conversation/:roomId/:conversationId/:conversationName"
            exact
            render={() => (
              <ChatRoom />
            )}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <LogIn setStyles={setStyles} />
            )}
          />
          <Route
            path="/signup"
            exact
            render={() => (
              <SignUp setStyles={setStyles} />
            )}
          />
          <Route
            path="/profile"
            exact
            render={() => (
              <ProfilePage />
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
