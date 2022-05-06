import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import SignIn from './SignIn';
import Home from './Home';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid justify-content-center'>
            <div className='px-2'> <NavLink to='/'>Sign In</NavLink> </div>
            <div className='px-2'> <NavLink to='/home'>Home</NavLink> </div>
            <div className='px-2'> <NavLink to='/register'>Register Course</NavLink> </div>
          </div>
        </div>

        <div className='d-flex justify-content-center mt-5'>
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