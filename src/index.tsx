import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ListProgram from './pages/list-program/ListProgram';
import PlanetView from './pages/planet/PlanetView';
import { Provider } from 'react-redux';
import rootStore from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mentor" element={<ListProgram />} />

        <Route path="/planet" element={<PlanetView />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
