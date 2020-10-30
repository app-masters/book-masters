import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Products";
import RegisterBook from "./RegisterBook";
import About from "./About";
import  Footer  from "./components/Footer";
import Navbar from "./components/Navbar";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products/:id" component={Product} />
      <Route path="/register" component={RegisterBook} />
      <Route path="/about" component={About} />
      {/* <Route path="/register" component={Resgister} /> */}
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
