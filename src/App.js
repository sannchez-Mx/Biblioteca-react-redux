import React, { Fragment } from "react";
import Router from "./Router";

//Componente global
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Router/>
      </div>
    </Fragment>
  );
}

export default App;
