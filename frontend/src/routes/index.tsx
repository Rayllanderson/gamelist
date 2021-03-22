import React from 'react';
import { Switch } from 'react-router';
import { Login } from '../pages/Login';
import MainPage from '../pages/Mainpage';
import { Register } from '../pages/Register';
import Route from './Route';

 const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login}/>
    <Route path="/mainpage" exact component={MainPage} isPrivate />
     <Route path="/register" exact component={Register}/>
  </Switch>
)

export default Routes;