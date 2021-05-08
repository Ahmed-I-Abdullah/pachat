import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { saveUser } from '../../localStorage';
import useWidth from '../../hooks/useWidth';
import signInAndUpdateUser from '../../middleware/userMiddleWare';
import { fetchChatRooms } from '../../middleware/listMiddleWare';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import './LogIn.scss';

const LogIn = ({
  setStyles,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setStyles({});
  }, []);
  const width = useWidth();
  const history = useHistory();

  const tempErrors = {};
  let validInputs = true;

  const validateInputs = () => {
    if (username === '') {
      validInputs = false;
      tempErrors.username = 'Please enter a username.';
    }

    if (password === '') {
      validInputs = false;
      tempErrors.password = 'Please enter your password.';
      setErrors(tempErrors);
    }
  };
  async function signIn() {
    await Auth.signIn(username, password).then((user) => {
      saveUser(user);
      dispatch(signInAndUpdateUser(user));
      dispatch(fetchChatRooms);
      if (width > 900) {
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
      } else {
        setStyles({
          minHeight: '100vh',
          overflow: 'auto',
        });
      }
      history.push('/');
    }).catch((error) => {
      console.log('Error signing in', error);
      tempErrors.username = 'Username or password are invalid.';
      setErrors(tempErrors);
      setPassword('');
    });
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputs();
    setErrors(tempErrors);
    if (validInputs) {
      signIn();
    }
  };

  return (
    <div className="login-container">
      <AuthHeader />
      <div className="login-div">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username">
              Username*
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="login-form-control"
              placeholder="Enter your username"
              id="username"
            />
            <div className="errors">{errors.username}</div>
          </div>

          <div className="login-form-group">
            <label htmlFor="password">
              Password*
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="login-form-control"
              placeholder="Enter a password"
              id="password"
            />
            <div className="errors">{errors.password}</div>
          </div>
          <input type="submit" value="Log In" className="login-submit" />
        </form>
      </div>
      <h1 className="signup-link">
        No Account?&nbsp;
        <a href="/signup">Sign Up</a>
      </h1>
    </div>
  );
};

LogIn.propTypes = {
  setStyles: PropTypes.func.isRequired,
};

export default LogIn;
