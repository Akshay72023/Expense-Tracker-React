import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Welcome from './Components/Welcome';
import Update from './Components/Update';
import ForgotPassword from './Components/ForgotPassword';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to="/welcome" /> : <Signup />} />
        <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to="/welcome" />} />
        <Route path='/welcome' element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />} />
        <Route path='/update' element={isLoggedIn ? <Update /> : <Navigate to="/login" />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
