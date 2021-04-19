import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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
  useEffect(() => {
    const updateUser = async () => {
      let fetchedData = null;

      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

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
          imageUrl: 'https://github.com/Ahmed-I-Abdullah/chat-app/blob/authentication/src/assets/profilePicture.png',
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

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ChatList} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/conversation/:conversationId/:conversationName" exact component={ChatRoom} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
