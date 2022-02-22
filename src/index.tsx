import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import EmployeeList from './components/mentor/EmployeeList';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/mentor' element={<EmployeeList/>}/>
    </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


