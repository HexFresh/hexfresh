import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


