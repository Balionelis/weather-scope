import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import HeaderMain from './components/Header/HeaderMain';
import Weather from './components/API/ApiFetching';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HeaderMain />
    <Weather />
  </React.StrictMode>
);