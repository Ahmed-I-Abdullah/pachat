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
