import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from './Components/Header';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Welcome from './Components/Welcome';


function App() {
  return (
    <div>
      <Header />
        <Switch>
          <Route path='/' exact><Signup /></Route> 
          <Route path='/login' exact><Login /></Route>
          <Route path='/welcome' exact><Welcome /></Route>
        </Switch>
    </div>
  );
}

export default App;
