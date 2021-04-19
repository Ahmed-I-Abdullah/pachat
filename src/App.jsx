import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import ChatList from './pages/ChatList/ChatList';
import UsersList from './pages/UsersList/UsersList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';

function App() {
  /* const myUser = {
    id: '0001',
    fullName: 'Ahmed',
    imageUrl: '',
    st-atus: 'good day!',
  };

  const myUser2 = {
    id: '0002',
    fullName: 'Jack',
    imageUrl: '',
    status: 'good day!',
  };

  const chatRoom = {
    id: 'R001',
    users: [myUser, myUser2],
  }; */
  /* console.log(chatRoom.users); */
  /* const myMessage = {
    id: 'M5599',
    content: 'This is my first message! This is my first message!
    This is my first message! This is my first message!',
    creationTime: '',
    user: myUser,
  };

  const myMessage2 = {
    id: 'M5555',
    content: 'Good Job!',
    creationTime: '',
    user: myUser2,
  }; */

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
