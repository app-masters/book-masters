import React, { Component } from "react";
import Navbar from "./components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
