import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {unregister} from './registerServiceWorker';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store/configurateStore';

ReactDOM.render(

    <Provider store={store}>
      <App />
    </Provider>      ,
  document.getElementById('root')
);

unregister();