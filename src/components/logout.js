import { useEffect } from 'react';
import axios from 'axios';

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');

        await axios.post(
          'http://localhost:8000/logout/',
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            withCredentials: true,
          }
        );

        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;

        // Delay the redirection to ensure local storage is cleared
        
          window.location.href = '/login';
        
      } catch (error) {
        console.log('Logout not working', error);
      }
    })();
  }, []);

  return null;
};

