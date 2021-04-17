import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UsersListItem from './components/UsersListItem/UsersListItem';

function App() {
  const myUser = {
    id: '0001',
    fullName: 'Ahmed',
    imageUrl: '',
    status: 'good day!',
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Navbar activePage="messages" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <UsersListItem user={myUser} />
            <UsersListItem user={myUser} />
          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
