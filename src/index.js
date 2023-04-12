import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JobsContextProvider } from './context/JobsContext'
import { AuthContextProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage';
import {BrowserRouter, Routes, Route } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <JobsContextProvider>
      <App />
    </JobsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

