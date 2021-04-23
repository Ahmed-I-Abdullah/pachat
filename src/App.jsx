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
import { getUser } from './pages/ChatList/queries';
import { createUser } from './graphql/mutations';
import { listUsers } from './graphql/queries';

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
  const [chatRooms, setChatRooms] = useState(null);
  const [users, setUsers] = useState(null);
  let currentUserTwo = null;

  const customFilter = (userToCheck) => {
    let roomExits = false;
    for (let i = 0; i < chatRooms.length; i += 1) {
      const firstUser = chatRooms[i].chatRoom.users.items[0].user;
      const secondUser = chatRooms[i].chatRoom.users.items[1].user;
      if (firstUser.id === currentUserTwo.attributes.sub && secondUser.id === userToCheck.id) {
        roomExits = true;
      }
      if (firstUser.id === userToCheck.id && secondUser.id === currentUserTwo.attributes.sub) {
        roomExits = true;
      }
    }
    if (!roomExits) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const updateUser = async () => {
      let fetchedData = null;

      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      if (currentUser) {
        fetchedData = await API.graphql(
          graphqlOperation(
            getUser, { id: currentUser.attributes.sub },
          ),
        );

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
      }
    };
    updateUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      currentUserTwo = await Auth.currentAuthenticatedUser();
      try {
        const databaseUsers = await API.graphql(graphqlOperation(
          listUsers,
        ));
        const tempUsers = databaseUsers.data.listUsers.items
          .filter((user) => user.id !== currentUserTwo.attributes.sub);

        const currentUserData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: currentUserTwo.attributes.sub,
            },
          ),
        );

        if (chatRooms === null) {
          setChatRooms(currentUserData.data.getUser.chatRooms.items);
        }

        if (tempUsers && users === null) {
          setUsers(tempUsers.filter(customFilter));
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
    };

    fetchUsers();
  }, [chatRooms, users]);

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
            component={() => (
              <ChatList isAuthed={isAuthenticated} />
            )}
          />
          <Route
            path="/users"
            exact
            component={() => (
              <UsersList isAuthed={isAuthenticated} users={users} />
            )}
          />
          <Route
            path="/conversation/:roomId/:conversationId/:conversationName"
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
