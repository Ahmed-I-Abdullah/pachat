import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Amplify from '@aws-amplify/core';
import { Provider } from 'react-redux';
import App from './App';
import awsExports from './aws-exports';
import store from './store';

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
