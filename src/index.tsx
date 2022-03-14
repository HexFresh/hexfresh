import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootStore from './store/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
