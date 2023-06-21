import { useEffect } from 'react';
import axios from 'axios';

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        let accessToken = localStorage.getItem('access_token');

        // Ensure the access token exists
        if (!accessToken) {
          console.error('Access token is missing.');
          return;
        }

        // Trim any whitespace from the access token
        accessToken = accessToken.trim();

        const response = await axios.post(
          'https://zergcoach-d7f65394356e.herokuapp.com/logout/',
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        // Check for successful response
        if (response.status === 205) {
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            // window.location.href = '/login';
        } else {
            console.error('Failed to log out on the server side.');
        }
        
      } catch (error) {
        console.error('Logout not working', error);
      }
    })();
  }, []);

  return null;
};

export default Logout;



