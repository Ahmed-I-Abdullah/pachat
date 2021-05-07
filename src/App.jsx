import React, { useEffect, useState } from 'react';
import {
  Switch, Route, BrowserRouter as Router,
} from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import ChatList from './pages/ChatList/ChatList';
import UsersList from './pages/UsersList/UsersList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { createUser } from './graphql/mutations';
import { getUser } from './graphql/queries';
import { selectAuthed } from './actions/userActions/userSelectors';
import useWidth from './hooks/useWidth';

function App() {
  const [afterSignIn, setAfterSignIn] = useState(false);
  const isAuthed = useSelector(selectAuthed);
  const width = useWidth();
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

  const updateUser = async () => {
    let fetchedData = null;
    try {
      let tempUser = null;
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          tempUser = user;
        })
        .catch((user) => {
          console.log('entered catch block: ', user);
        });

      if (tempUser) {
        fetchedData = await API.graphql(
          graphqlOperation(
            getUser, { id: tempUser.attributes.sub },
          ),
        );

        if (tempUser && !fetchedData.data.getUser) {
          const newUser = {
            id: tempUser.attributes.sub,
            fullName: tempUser.attributes.name,
            imageUrl: 'https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8',
            status: 'Available',
          };
          await API.graphql(
            graphqlOperation(
              createUser, { input: newUser },
            ),
          );
        }
      }
    } catch (e) {
      console.log('updating error in app: ', e);
    }
  };

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
    updateUser();
  }, [afterSignIn]);

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
              <LogIn
                setStyles={setStyles}
                updateUser={updateUser}
                setAfterSignIn={setAfterSignIn}
              />
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
