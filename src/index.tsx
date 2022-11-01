import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features';
import { getLocalStorageItem } from './lib/functions/localStorage';
import { USER_LOCALSTORAGE_KEY } from './lib/constants';
import { tempSetUser, fetchUserCheck } from './features/authSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

async function loadUser() {
  const userInfo = await getLocalStorageItem(USER_LOCALSTORAGE_KEY);
  if (!userInfo) {
    return;
  } else {
    store.dispatch(tempSetUser(userInfo));
    store.dispatch(fetchUserCheck());
  }
}

loadUser();
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
