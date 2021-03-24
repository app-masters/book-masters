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

api.interceptors.response.use(res => res, (err) => {
  if (err.response.status === 401) {
    localStorage.removeItem('authentication');
    window.location.reload();
  }
  return Promise.reject(err);
});

export default api;
