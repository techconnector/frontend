import React, { Fragment } from "react";

import Navbar from "./Navbar";
import Alert from "./Alert";

export default function Master({ children }) {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Alert />
        {children}
      </div>
    </Fragment>
  );
}
