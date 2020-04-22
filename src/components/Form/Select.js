import React, { Fragment, useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Select({ name, label, subtitle, children, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Fragment>
      {label && <label>{label}</label>}
      <select ref={selectRef} defaultValue={defaultValue} {...rest}>
        {children}
      </select>
      {subtitle && <small className="form-text">{subtitle}</small>}
      {error && <span className="error">{error}</span>}
    </Fragment>
  );
}
