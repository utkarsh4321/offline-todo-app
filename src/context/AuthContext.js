import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

const initialState = {
  userId: null,
  email: null,
};

let authStore = {
  getState: () => initialState,
  dispatch: () => {},
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        userId: action.payload.userId,
        email: action.payload.email,
      };
    case 'CLEAR_USER':
      return initialState;
    case 'GET_USER':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  authStore = {
    getState: () => state,
    dispatch,
  };
  const setUser = (userId, email) => {
    dispatch({
      type: 'SET_USER',
      payload: { userId, email },
    });
  };

  const getUser = () => {
    dispatch({ type: 'GET_USER' });
  };

  const clearUser = () => {
    dispatch({ type: 'CLEAR_USER' });
  };

  const value = {
    ...state,
    setUser,
    clearUser,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const getAuthStore = () => {
  return authStore;
};
