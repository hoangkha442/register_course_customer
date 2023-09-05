import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import userSlice from './redux/userSlice';
import coursesSlice from './redux/coursesSlice';
import spinnerSlice from './redux/spinnerSlice';
import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let store = configureStore({
  reducer: {
    userSlice,
    coursesSlice,
    spinnerSlice,
  },
});
root.render(  
  <Provider store={store}>
    <App />
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
