import React, { Component } from "react";
import Navbar from "./components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";
import { Footer } from "./components/Footer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar />
        <Routes />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
