import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BOOKS_NODE,
});

api.interceptors.request.use(async (config) => {
  const local = JSON.parse(localStorage.getItem('authentication'));
  if (local) {
    config.headers = {
      Authorization: `Bearer ${local.token}`,
      Accept: 'application/json',
    };
  }
  return config;
});

export default api;
