import React from 'react';
import { Switch } from 'react-router';
import GameDetails from '../components/GameDetails/Index';
import { Login } from '../components/Login/Index';
import Home from '../components/Main/Index';
import { Register } from '../components/Register/Index';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/games" exact component={Home} isPrivate hasNavBar />
    <Route path="/games/status/:status" exact component={Home} isPrivate hasNavBar/>
    <Route path="/games/:id" component={GameDetails} isPrivate hasNavBar/>
  </Switch>
)

export default Routes;