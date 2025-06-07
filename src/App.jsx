import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Main from './layout/main';
import Popup from './components/BaseCompenents/Popup';
import { http } from './services/httpService';
import { useAuth } from './context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorBoundary from './components/BaseCompenents/ErrorBoundary';

function App() {
  const [isModalOpen, setModal] = useState(false);
  const pwaEventRef = useRef(null);
  const history = useHistory();
  const { setUser } = useAuth();

  useEffect(() => {
    const rot = window.document.documentElement;
    rot.classList.add('dark');

    async function getUserInfo() {
      try {
        const userData = await http.get('/user/user-info', {});
        if (userData && userData.data && userData.data.userId) {
          setUser(userData.data.userId, userData.data.email);
          history.push('/');
        } else {
          console.error('User data not found');
          history.push('/login');
        }
      } catch (e) {
        console.error('Error fetching user info:', e);
        history.push('/login');
      }
    }
    getUserInfo();
    // PWA SETUP to install this app

    // check for Edge sidebar opens the app

    const isSidebarPWA = (() => {
      if (navigator.userAgentData) {
        return navigator.userAgentData.brands.some((b) => {
          return b.brand === 'Edge Side Panel';
        });
      }
      return false;
    })();
    // check PWA already installed or not

    // Whether we are running as an installed PWA or not.
    const isInstalledPWA =
      window.matchMedia('(display-mode: window-controls-overlay)').matches ||
      window.matchMedia('(display-mode: standalone)').matches;

    function beforeInstallFunc(e) {
      e.preventDefault();
      pwaEventRef.current = e;
    }
    function appInstalledFunc() {
      pwaEventRef.current = null;
      setModal(false);
    }
    if (!isInstalledPWA && !isSidebarPWA) {
      setModal(true);
      window.addEventListener('beforeinstallprompt', beforeInstallFunc);
      window.addEventListener('appinstalled', appInstalledFunc);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallFunc);
      window.removeEventListener('appinstalled', appInstalledFunc);
    };
  }, []);
  const openModal = () => {
    setModal(!isModalOpen);
  };

  return (
    <div className="w-full h-full dark:bg-gray-900 dark:text-white font-body bg-gray-300 text-gray-800">
      <ErrorBoundary>
        <Main />
        <Popup open={isModalOpen}>
          <div
            className={`todo__form flex flex-col w-96 md:max-w-4xl todo__form--content px-3 py-4 rounded text-current dark:bg-gray-700 bg-gray-200 z-10 ${
              isModalOpen ? 'form__active' : ''
            }`}
          >
            <div className="flex flex-end gap-x-4">
              <div>
                <img
                  src="/android-chrome-192x192.png"
                  className=""
                  alt="karya suchi"
                />
              </div>
              <div>
                <p>
                  To get seemless experience install this app. It will help you
                  to track and achieve your goals efficiently.
                </p>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="dark:bg-darkSecondary bg-gray-800 text-white text-white rounded-sm py-1 px-3 mr-2 dark:hover:bg-darkSecondary-700 hover:bg-gray-900"
                onClick={() => {
                  if (!pwaEventRef.current) {
                    return;
                  }
                  pwaEventRef.current.prompt();
                }}
              >
                Install
              </button>
              <button
                className="dark:hover:bg-gray-800 px-3 py-1 hover:bg-gray-400"
                onClick={openModal}
              >
                Close
              </button>
            </div>
          </div>
        </Popup>
      </ErrorBoundary>
    </div>
  );
}

export default App;
