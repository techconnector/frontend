import React, { Fragment, useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Textarea({ name, label, subtitle, ...rest }) {
  const textareaRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Fragment>
      {label && <label>{label}</label>}
      <textarea ref={textareaRef} defaultValue={defaultValue} {...rest} />
      {subtitle && <small className="form-text">{subtitle}</small>}
      {error && <span className="error">{error}</span>}
    </Fragment>
  );
}
