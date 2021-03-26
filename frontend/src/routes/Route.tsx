import React, { useContext } from 'react';
import { Route as ReactDomRoute, RouteProps as ReactRouterProps, Redirect } from 'react-router-dom'
import MyNavbar from '../components/Navbar/Index';
import { AuthContext } from '../hooks/AuthContext';

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  hasNavBar?: boolean;
  component: React.ComponentType<ReactRouterProps>
}
const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, hasNavBar, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <ReactDomRoute {...rest} render={(props) => {
      return isPrivate === !!user ? (
        <div>
          {hasNavBar && <MyNavbar /> }
          <Component {...props} />
        </div>
      ) : (
        <Redirect to={{ pathname: isPrivate ? '/' : '/games' }} />
      )
    }} />
  )
};

export default Route;