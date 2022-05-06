import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import SignIn from './SignIn';
import Home from './Home';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='header'>
          <NavLink to='/'>Sign In</NavLink>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='/register'>Register Course</NavLink>
        </div>

        <div className='content'>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;