import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Products";
import About from "./About";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products/:id" component={Product} />
      <Route path="/about" component={About} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
