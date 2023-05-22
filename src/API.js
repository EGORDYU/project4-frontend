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

export { commentsApi, buildOrdersApi };
