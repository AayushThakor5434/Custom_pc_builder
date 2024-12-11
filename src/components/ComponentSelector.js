import React from 'react';

const ComponentSelector = ({ label, options, onSelect }) => {
  return (
    <div>
      <h3>{label}</h3>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} - ${option.price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComponentSelector;
