import React from "react";

export default function Button({ children, className, ...rest }) {
  return (
    <button className={"btn" + (className ? " " + className : "")} {...rest}>
      {children}
    </button>
  );
}
