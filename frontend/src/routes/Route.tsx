import React, { useContext } from 'react';
import {Route as ReactDomRoute, RouteProps as ReactRouterProps, Redirect} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const Route: React.FC<RouteProps> = ({isPrivate = false, component: Component, ...rest}) => {
  const { user } = useContext(AuthContext);
  return (
    <ReactDomRoute {...rest} render={() => {
        return isPrivate === !!user ? (
          <Component/>
        ) : (
          <Redirect to={{pathname: isPrivate ? '/' : '/mainpage'}} />
        )
    }}/>
  )
};

export default Route;