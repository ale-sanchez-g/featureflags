import React, { useState } from 'react';
import './NameInput.css'; // Make sure to import the CSS file

const NameInput = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(name);
  };

  return (
    <div className="name-input-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NameInput;