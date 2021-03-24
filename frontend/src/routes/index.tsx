import React from 'react';
import { Switch } from 'react-router';
import GameDetails from '../components/GameDetails/Index';
import { Login } from '../components/Login/Index';
import MainPage from '../components/Main/Index';
import { Register } from '../components/Register/Index';
import Route from './Route';

 const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login}/>
    <Route path="/mainpage" exact component={MainPage} isPrivate />
     <Route path="/register" exact component={Register}/>
     <Route path="/game/:id" component={GameDetails} isPrivate/>
  </Switch>
)

export default Routes;