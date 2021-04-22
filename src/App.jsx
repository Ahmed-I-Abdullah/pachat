import React, { useEffect, useState } from 'react';
import {
  Switch, Route, BrowserRouter,
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
  const [styles, setStyles] = useState({
    borderRadius: '50px',
    overflow: 'auto',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '4vh',
    boxShadow: '8px 8px 8px 6px #D9D2D2',
    border: '10px solid var(--violet-red)',
    height: '90vh',
  });
  useEffect(() => {
    const updateUser = async () => {
      let fetchedData = null;

      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      console.log(`Current user is: ${currentUser}`);
      if (currentUser) {
        fetchedData = await API.graphql(
          graphqlOperation(
            getUser, { id: currentUser.attributes.sub },
          ),
        );
      }

      if (!fetchedData.data.getUser) {
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
    };

    updateUser();
  }, []);

  Auth.currentAuthenticatedUser({ bypassCache: true })
    .then(() => { setIsAuthenticated(true); })
    .catch(() => { setIsAuthenticated(false); });

  return (
    <div
      style={styles}
      className="App"
    >
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <ChatList isAuthed={isAuthenticated} />
            )}
          />
          <Route
            path="/users"
            exact
            render={() => (
              <UsersList isAuthed={isAuthenticated} />
            )}
          />
          <Route
            path="/conversation/:conversationId/:conversationName"
            exact
            render={() => (
              <ChatRoom isAuthed={isAuthenticated} />
            )}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <LogIn setIsAuthenticated={setIsAuthenticated} setStyles={setStyles} />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
