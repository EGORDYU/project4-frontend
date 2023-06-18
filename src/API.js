import axios from 'axios';

const backendDomain = "https://zergcoach-d7f65394356e.herokuapp.com"; // Replace with your backend domain

const commentsApi = axios.create({
  baseURL: `${backendDomain}/api/comments`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const buildOrdersApi = axios.create({
  baseURL: `${backendDomain}/api/buildorders`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const api = axios.create({
  baseURL: `${backendDomain}/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(request => {
  request.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
  return request;
});

export default api;
export { commentsApi, buildOrdersApi };
