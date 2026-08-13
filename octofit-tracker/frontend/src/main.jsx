/**
 * React 19 Application Entry Point
 *
 * Sets up the root React application with:
 * - React 19 with Strict Mode for development debugging
 * - react-router-dom BrowserRouter for client-side navigation
 * - Bootstrap 5 CSS framework for responsive design
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
