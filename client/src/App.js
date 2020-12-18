import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: "jss-insertion-point"
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
       <StylesProvider jss={jss} >
        <CssBaseline />
        <Routes />
        </StylesProvider>
      </React.Fragment>
    );
  }
}

export default App;
