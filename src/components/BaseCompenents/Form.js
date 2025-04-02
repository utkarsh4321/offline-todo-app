import React, { useState } from 'react';
import Button from './Button';
function Form({ onSubmit, isPending, errors, buttonText }) {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Submitted value:', inputValue);
    // You can perform other actions here, like sending the data to an API
    alert(`Submitted: ${inputValue}`);
    setInputValue(''); //Clear input after submitting
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Enter something:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}

export default Form;
