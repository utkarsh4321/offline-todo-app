import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  //   let history = useHistory();
  //   let location = useLocation();
  const { userId } = useAuth();

  return userId ? (
    children
  ) : (
    // Redirect to login if userId is not present
    <Redirect to={{ pathname: '/login' }} />
    // For now, we will just return null
  );
};
