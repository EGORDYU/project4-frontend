// Assuming the interceptor code is in a separate file, e.g., axiosInterceptor.js
import axios from 'axios';

let refresh = false;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem('refresh_token'));
      const response = await axios.post(
        'https://zergcoach-d7f65394356e.herokuapp.com/token/refresh/',
        {
          refresh: localStorage.getItem('refresh_token'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_id', response.data.user_id); // Update the user_id in localStorage
        return axios(error.config);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

export default axios;
