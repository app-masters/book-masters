import React from "react";
import Books from "./Books";
import Header from './components/Header'


export default function Home() {
  return (
    <React.Fragment>
        <Header/>
        <Books />
    </React.Fragment>
  );
}
