import axios from 'axios';

const commentsApi = axios.create({
  baseURL: "/api/comments",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const buildOrdersApi = axios.create({
  baseURL: "/api/buildorders",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const api = axios.create({
    baseURL: "/api",
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
