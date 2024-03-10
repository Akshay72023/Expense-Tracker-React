import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Welcome from './Components/Welcome';
import Update from './Components/Update';


function App() {
  return (
    <div>
        <Switch>
          <Route path='/' exact><Signup /></Route> 
          <Route path='/login' exact><Login /></Route>
          <Route path='/welcome' exact><Welcome /></Route>
          <Route path='/update' exact><Update /></Route>
        </Switch>
    </div>
  );
}

export default App;
