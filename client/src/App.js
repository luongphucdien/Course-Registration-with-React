import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import SignIn from './SignIn';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;