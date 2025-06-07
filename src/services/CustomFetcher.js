import { getAuthStore } from '../context/AuthContext';

const BASE_URL = `${process.env.HOST}${process.env.APIENDPOINT}` || '';
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshTokenRequest = async () => {
  const authStore = getAuthStore();
  // authStore.dispatch({ type: 'CLEAR_USER' });
  try {
    const response = await fetch(`${BASE_URL}/user/refresh`, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await response.json();
    if (response.ok) {
      authStore.dispatch({
        type: 'SET_USER',
        payload: {
          userId: data.userId,
          email: data.email,
        },
      });
      return data;
    }
    // window.location.href = '/login';
    authStore.dispatch({ type: 'CLEAR_USER' });
    throw new Error('Failed to refresh token');
  } catch (error) {
    // window.location.href = '/login';
    authStore.dispatch({ type: 'CLEAR_USER' });

    throw error;
  }
};

export const customFetch = async (url, options = {}) => {
  // Add access token to headers if it exists
  const headers = {
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // If response is OK, return it
    if (response?.ok) {
      return response;
    }

    // If we get a 401 and we're not already refreshing
    if (options.isRefreshed === false) {
      // If the request is for refreshing the token, we don't need to handle it here
      return response;
    }
    if (!isRefreshing && response.status === 401) {
      // If not refreshing, set isRefreshing to true and try to refresh the token
      isRefreshing = true;

      try {
        const newToken = await refreshTokenRequest();
        isRefreshing = false;
        // processQueue(null, newToken);

        // Retry the original request with new token
        return fetch(url, { ...options, headers, credentials: 'include' });
      } catch (error) {
        // processQueue(error, null);
        isRefreshing = false;
        throw error;
      }
    } else {
      throw new Error('ALready refreshing token, please wait');
      // If we're already refreshing, add request to queue
      // return new Promise((resolve, reject) => {
      //   failedQueue.push({ resolve, reject });
      // })
      //   .then((token) => {
      //     return fetch(url, { ...options, headers });
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });
    }
  } catch (error) {
    throw error;
  }
};
