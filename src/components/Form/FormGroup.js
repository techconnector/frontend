import React from "react";

export default function FormGroup({ className, children }) {
  return (
    <div className={"form-group" + (className ? " " + className : "")}>
      {children}
    </div>
  );
}
