import React from 'react';

function Button({ isSvg = false, type = '', disabled = false, children }) {
  return (
    <button
      className="btn-submit dark:bg-darkSecondary transition-transform duration-200 ease-in-out dark:text-gray-800 group transform hover:scale-105"
      type={type}
      disabled={disabled}
    >
      <span className="capitalize">{children}</span>
      {isSvg && (
        <svg
          className="w-6 h-6 ml-1 transition-transform duration-1000 ease-out transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      )}
    </button>
  );
}

export default Button;
