import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/Store/Store';
import { Auth0Provider } from '@auth0/auth0-react';
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1Ijoiam9zZWFsYXIiLCJhIjoiY2w3Z3E1MjR6MDZ6bTNvbWhoenVjemFicCJ9.yM3QT5aQgKqeLKTDt7sUVw"

axios.defaults.baseURL = 'https://onlypanbackend-production.up.railway.app';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
      domain="dev-6idpl3n4.us.auth0.com"
      clientId="fhMtaVwapsEJGUH0k4hAbhhYsABT9kdV"
      redirectUri={window.location.origin}
    > 
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </Provider>
  </Auth0Provider>
);
