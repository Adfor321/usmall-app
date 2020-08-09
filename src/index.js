import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./store"
import './assets/js/rem'
import './assets/css/reset.css'
Component.prototype.$img = 'http://localhost:3000'
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

