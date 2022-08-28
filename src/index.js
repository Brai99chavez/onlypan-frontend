import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/Store/Store';
import { Auth0Provider } from '@auth0/auth0-react';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
      domain="dev-6idpl3n4.us.auth0.com"
      clientId="6EgTGHK5SQxiTTYDFETJUGizmAQHxFp2"
      redirectUri={window.location.origin}
    > 
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </Provider>
  </Auth0Provider>
);
