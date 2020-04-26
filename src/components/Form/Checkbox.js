import React, { Fragment, useState, useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Checkbox({ name, label, subtitle, onChange, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [isChecked, setIsChecked] = useState(defaultValue || false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  function handleCheckboxChange(e) {
    setIsChecked(!isChecked);
    onChange(e);
  }

  return (
    <Fragment>
      <input
        {...rest}
        type="checkbox"
        ref={inputRef}
        checked={isChecked}
        value={isChecked}
        onChange={handleCheckboxChange}
      />{" "}
      {label && <label>{label}</label>}
      {subtitle && <small className="form-text">{subtitle}</small>}
      {error && <span className="error">{error}</span>}
    </Fragment>
  );
}
