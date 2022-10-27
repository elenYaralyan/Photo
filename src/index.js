import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Loader from './components/loader/Loader';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Loader />
    <App />
  </Provider>
);

