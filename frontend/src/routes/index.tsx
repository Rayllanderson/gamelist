import React from 'react';
import { Switch, Redirect } from 'react-router';
import Account from '../pages/Account/Index';
import GameDetails from '../pages/GameDetails/Index';
import Home from '../pages/Main/Index';
import Route from './Route';
import { Root } from '../pages/Root/Index';
import NotFound from '../pages/NotFound/Index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Root} />
    <Route path="/404" component={NotFound}/>
    <Route path="/register" exact component={Root} />
    <Route path="/forget-password" exact component={Root} />
    <Route path="/games" exact component={Home} isPrivate hasNavBar />
    <Route path="/games/status/:status" exact component={Home} isPrivate hasNavBar/>
    <Route path="/games/:id" component={GameDetails} isPrivate hasNavBar/>
    <Route path="/my-account" exact component={Account} hasNavBar isPrivate />
    <Redirect to="/404" />
  </Switch>
)

export default Routes;