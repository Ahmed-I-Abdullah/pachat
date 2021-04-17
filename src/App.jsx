import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import UsersListItem from './components/UsersListItem/UsersListItem';
import ChatMessage from './components/ChatMessage/ChatMessage';
import MessageInput from './components/MessageInput/MessageInput';

function App() {
  const myUser = {
    id: '0001',
    fullName: 'Ahmed',
    imageUrl: '',
    status: 'good day!',
  };

  const myUser2 = {
    id: '0002',
    fullName: 'Jack',
    imageUrl: '',
    status: 'good day!',
  };

  const myMessage = {
    id: 'M5599',
    content: 'This is my first message! This is my first message! This is my first message! This is my first message!',
    creationTime: '',
    user: myUser,
  };

  const myMessage2 = {
    id: 'M5555',
    content: 'Good Job!',
    creationTime: '',
    user: myUser2,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Navbar activePage="messages" />
          <div style={{
            display: 'flex', flexDirection: 'column', width: '100%', maxHeight: '100vh',
          }}
          >
            <ChatMessage message={myMessage} />
            <ChatMessage message={myMessage2} />
            <MessageInput />
          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
