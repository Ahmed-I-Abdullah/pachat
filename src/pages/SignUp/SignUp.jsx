import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import './SignUp.scss';

const SignUp = ({ setStyles }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const [permenantUsername, setPermenantUsername] = useState('');

  const history = useHistory();
  const tempErrors = {};

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    confirmEmail: '',
  });

  useEffect(() => {
    setStyles({});
  }, []);

  async function signUp() {
    await Auth.signUp({
      username,
      password,
      attributes: {
        name,
        email,
      },
    }).then(() => setSignedUp(true))
      .catch((error) => {
        if (error.code === 'UsernameExistsException') {
          tempErrors.username = 'Username already exits.';
          setErrors(tempErrors);
          setUsername('');
        } else if (error.code === 'InvalidParameterException') {
          tempErrors.password = 'Password must be more than 6 characters';
          setErrors(tempErrors);
          setPassword('');
        }
        console.log('Error signing up:', error);
      });
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(permenantUsername, confirmEmail);
    } catch (error) {
      console.log('Error confirming sign up', error);
    }
  }

  let validInputs = true;
  let validCode = true;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const validateInputs = () => {
    if (name === '') {
      validInputs = false;
      tempErrors.name = 'Please enter your name.';
    }

    if (email === '') {
      validInputs = false;
      tempErrors.email = 'Please enter your email.';
    }

    if (typeof email !== 'undefined') {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        validInputs = false;
        tempErrors.email = 'Please enter valid email address.';
      }
    }

    if (username === '') {
      validInputs = false;
      tempErrors.username = 'Please enter a username.';
    }

    if (password === '') {
      validInputs = false;
      tempErrors.password = 'Please enter your password.';
    }

    if (confirmPassword === '') {
      validInputs = false;
      tempErrors.confirmPassword = 'Please confirm your password.';
    }

    if (typeof password !== 'undefined' && typeof confirmPassword !== 'undefined') {
      if (password !== confirmPassword) {
        validInputs = false;
        tempErrors.password = "Passwords don't match.";
      }
    }
  };

  const validateCode = () => {
    if (confirmEmail === '') {
      validCode = false;
      tempErrors.confirmEmail = 'Please enter your code.';
      setErrors(tempErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signedUp) {
      validateInputs();
      setErrors(tempErrors);
      if (validInputs) {
        signUp();
        setPermenantUsername(username);
      }
    } else {
      validateCode();
      if (validCode) {
        confirmSignUp();
        setErrors({});
        history.push('/login');
      }
    }
  };

  return (
    <div className="signup-container">
      <AuthHeader />
      {!signedUp && (
      <h1 className="login-link">
        ALready have an account?&nbsp;
        <a href="/login">Login</a>
      </h1>
      )}
      <div className="signup-div">
        {!signedUp ? <h1>Sign Up</h1> : <h1>Confirm Email</h1>}
        {!signedUp && (
          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="name">
                Full Name*
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="signup-form-control"
                placeholder="Enter name"
              />
              <div className="errors">{errors.name}</div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="email">
                Email*
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="signup-form-control"
                placeholder="Enter your email"
                id="email"
              />
              <div className="errors">{errors.email}</div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="username">
                Username*
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="signup-form-control"
                placeholder="Enter your username"
                id="username"
              />
              <div className="errors">{errors.username}</div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="password">
                Password*
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="signup-form-control"
                placeholder="Enter a password"
                id="password"
              />
              <div className="errors">{errors.password}</div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="confirmPassword">
                Confirm Password*
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="signup-form-control"
                placeholder="Enter your password again"
                id="confirmPassword"
              />
              <div className="errors">{errors.confirmPassword}</div>
            </div>

            <input type="submit" value="Sign Up" className="signup-submit" />
          </form>
        )}
        {' '}
        {
          signedUp && (
            <form onSubmit={handleSubmit}>
              <div className="signup-form-group">
                <label htmlFor="confirmEmail">
                  Enter the confirmation code sent to your email
                </label>
                <input
                  type="text"
                  name="confirmEmail"
                  value={confirmEmail}
                  onChange={handleConfirmEmailChange}
                  className="signup-form-control"
                  placeholder="Enter your code"
                  id="confirmEmail"
                />
                <div className="errors">{errors.confirmEmail}</div>
                <input type="submit" value="Submit" className="signup-submit" />
              </div>
            </form>
          )
        }
      </div>
    </div>
  );
};

SignUp.propTypes = {
  setStyles: PropTypes.func.isRequired,
};

export default SignUp;
