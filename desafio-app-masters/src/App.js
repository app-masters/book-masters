import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./Home";
import { Footer } from "./Components/Footer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar />
        <Home />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
