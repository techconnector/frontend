import React, { Fragment, useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({
  name,
  type = "text",
  label,
  subtitle,
  ...rest
}) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Fragment>
      {label && <label>{label}</label>}
      <input ref={inputRef} defaultValue={defaultValue} type={type} {...rest} />
      {subtitle && <small className="form-text">{subtitle}</small>}
      {error && <span className="error">{error}</span>}
    </Fragment>
  );
}
