import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Product from './pages/products';
import RegisterBook from './pages/registerBook';
import About from './pages/about';
import Login from './pages/login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products/:id" component={Product} />
      <Route path="/register" component={RegisterBook} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
