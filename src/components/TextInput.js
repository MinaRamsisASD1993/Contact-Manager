import React from "react";

function TextInput(props) {
  const { label, type, value, id, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        id={id}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default TextInput;
