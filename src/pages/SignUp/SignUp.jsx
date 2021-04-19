import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import './SignUp.scss';
import logo from '../../assets/darkLogo.svg';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  const tempErrors = {};
  let validInputs = true;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputs();
    setErrors(tempErrors);
    console.log(errors);
    if (validInputs) {
      console.log(name);
      setName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      signUp();
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-header">
        <img className="signup-header-logo" src={logo} alt="logo" />
        <h1 className="signup-header-title">Pachat</h1>
      </div>
      <h1 className="login-link">
        ALready have an account?&nbsp;
        <a href="/login">Login</a>
      </h1>
      <div className="signup-div">
        <h1>Sign Up</h1>
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

          <input type="submit" value="Submit" className="signup-submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
