import React, { useContext } from 'react';
import {Route as ReactDomRoute, RouteProps as ReactRouterProps, Redirect} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType<ReactRouterProps>
}
const Route: React.FC<RouteProps> = ({isPrivate = false, component: Component, ...rest}) => {
  const { user } = useContext(AuthContext);
  return (
    <ReactDomRoute {...rest} render={(props) => {
        return isPrivate === !!user ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{pathname: isPrivate ? '/' : '/games'}} />
        )
    }}/>
  )
};

export default Route;