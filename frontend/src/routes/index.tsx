import React from 'react';
import { Switch } from 'react-router';
import { Login } from '../pages/login';
import MainPage from '../pages/mainpage';
import Route from './Route';

 const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login}/>
    <Route path="/mainpage" exact component={MainPage} isPrivate />

  </Switch>
)

export default Routes;