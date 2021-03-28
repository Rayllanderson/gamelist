import React from 'react';
import { Switch } from 'react-router';
import Account from '../pages/Account/Index';
import GameDetails from '../pages/GameDetails/Index';
import Home from '../pages/Main/Index';
import Route from './Route';
import { Root } from '../pages/Root/Index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Root} />
    <Route path="/register" exact component={Root} />
    <Route path="/forget-password" exact component={Root} />
    <Route path="/games" exact component={Home} isPrivate hasNavBar />
    <Route path="/games/status/:status" exact component={Home} isPrivate hasNavBar/>
    <Route path="/games/:id" component={GameDetails} isPrivate hasNavBar/>
    <Route path="/my-account" exact component={Account} hasNavBar isPrivate />
  </Switch>
)

export default Routes;