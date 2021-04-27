import React, { useEffect, useState } from 'react';
import {
  Switch, Route, BrowserRouter as Router,
} from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import ChatList from './pages/ChatList/ChatList';
import UsersList from './pages/UsersList/UsersList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [currentUser, setCurrentUser] = useState(null);
  const breakpoint = 900;

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

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    if (width <= breakpoint) {
      setStyles({
        minHeight: '100vh',
        overflow: 'auto',
      });
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

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [width]);

  useEffect(() => {
    const updateUser = async () => {
      let fetchedData = null;
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          if (currentUser === null) {
            setCurrentUser(user);
          }
          if (isAuthenticated === null) {
            setIsAuthenticated(true);
          }
        })
        .catch((user) => {
          console.log('entered catch block: ', user);
          setIsAuthenticated(false);
        });

      console.log('currentuser is: ', currentUser);

      if (currentUser) {
        fetchedData = await API.graphql(
          graphqlOperation(
            getUser, { id: currentUser.attributes.sub },
          ),
        );

        if (currentUser && !fetchedData.data.getUser) {
          const newUser = {
            id: currentUser.attributes.sub,
            fullName: currentUser.attributes.name,
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
    };
    updateUser();
  }, [isAuthenticated, currentUser]);

  console.log('authenticated', isAuthenticated);
  console.log('hhh', currentUser);

  if (isAuthenticated !== null && currentUser !== null) {
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
                <ChatList
                  isAuthed={isAuthenticated}
                  currentUserID={currentUser.attributes.sub}
                  width={width}
                />
              )}
            />
            <Route
              path="/users"
              exact
              render={() => (
                <UsersList
                  isAuthed={isAuthenticated}
                  currentUserID={currentUser.attributes.sub}
                  width={width}
                />
              )}
            />
            <Route
              path="/conversation/:roomId/:conversationId/:conversationName"
              exact
              render={() => (
                <ChatRoom
                  isAuthed={isAuthenticated}
                  currentUserID={currentUser.attributes.sub}
                  width={width}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LogIn
                  setIsAuthenticated={setIsAuthenticated}
                  setStyles={setStyles}
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
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  } return null;
}

export default App;
