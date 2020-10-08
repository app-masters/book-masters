import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Products";
import RegisterBook from "./RegisterBook";



const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products/:id" component={Product} />
      <Route path="/register" component={RegisterBook} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
