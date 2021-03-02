import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Book from './pages/book';
import RegisterBook from './pages/registerBook';
import Reserves from './pages/reserves';
import About from './pages/about';
import Login from './pages/login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useAuth } from './lib/auth';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/book/:id" component={Book} />
      <PrivateRoute path="/register" role="admin">
        <RegisterBook />
      </PrivateRoute>
      <PrivateRoute path="/reserves">
        <Reserves />
      </PrivateRoute>
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

const PrivateRoute = ({ children, role, ...rest }) => {
  const { auth } = useAuth();

  if (role) {
    if (auth.user.role === role) {
      return children;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }

  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    </>
  );
};

export default Routes;
