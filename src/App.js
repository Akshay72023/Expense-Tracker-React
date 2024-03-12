import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
      <Switch>
        <Route path='/' exact>
          {isLoggedIn ? <Redirect to="/welcome" /> : <Signup />}
        </Route>
        <Route path='/login' exact>
          {!isLoggedIn ? <Login /> : <Redirect to="/welcome" />}
        </Route>
        <Route path='/welcome'>
          {isLoggedIn ? <Welcome /> : <Redirect to='/login' />}
        </Route>
        <Route path='/update'>
          {isLoggedIn ? <Update /> : <Redirect to='/login' />}
        </Route>
        <Route path='/forgotpassword' exact>
          <ForgotPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
