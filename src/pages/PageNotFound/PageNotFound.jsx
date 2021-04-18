import React from 'react';
import './PageNotFound.scss';
import notFound from '../../assets/notFound.svg';

const PageNotFound = () => (
  <div className="not-found-container">
    <img src={notFound} alt="page not found" />
    <h1>404 Page Not Found</h1>
  </div>
);

export default PageNotFound;
