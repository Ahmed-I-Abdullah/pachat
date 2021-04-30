import React from 'react';
import './AuthHeader.scss';
import logo from '../../assets/darkLogo.svg';

const AuthHeader = () => (
  <div className="auth-header">
    <img className="auth-header-logo" src={logo} alt="logo" />
    <h1 className="auth-header-title">Pachat</h1>
  </div>
);

export default AuthHeader;
