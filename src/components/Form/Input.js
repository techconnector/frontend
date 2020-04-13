import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, type = "text", label, legend, ...rest }) {
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
    <div className="form-group">
      {label && <label>{label}</label>}
      <input ref={inputRef} defaultValue={defaultValue} type={type} {...rest} />
      {legend && <small className="form-text">{legend}</small>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
