import React, { useContext } from 'react';

import { ThemeContext } from '../context/themeContext';

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const onClickedHandler = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <header className="flex-shrink-0" tabIndex={0}>
      <div className="p-5 flex justify-between align-center">
        <h1
          className="text-2xl font-weight-semibold dark:text-darkSecondary"
          tabIndex={0}
          aria-label="karyasuchi - To make you productive and organized"
        >
          karyasuchi
        </h1>

        <div className="flex" tabIndex={0} aria-label="Toggle dark mode">
          {/* <button className="md:mr-20 mr-8">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button> */}
          <button
            className="dark:bg-gray-700  border-0 bg-darkSecondary rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
            id="toogleBtn"
            onClick={onClickedHandler}
          >
            {theme === 'light' ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
