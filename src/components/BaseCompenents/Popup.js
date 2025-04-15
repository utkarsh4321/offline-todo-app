import React from 'react';
import './Popup.css';
function Modal({ openModalHandler, open, children }) {
  return (
    <div
      className={`overflow-div fixed inset-0 bg-black bg-opacity-75 z-10 flex justify-center items-center ${
        open ? 'open' : ''
      }`}
      onClick={openModalHandler}
    >
      <div
        className={(open && 'block') || 'hidden'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
