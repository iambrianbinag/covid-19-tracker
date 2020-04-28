import React from "react";

const Select = ({ selectClassName, options, onChange, selected }) => {
  return (
    <select
      className={selectClassName}
      style={{ cursor: "pointer" }}
      defaultValue={selected}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
