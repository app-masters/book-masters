import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BOOKS_NODE,
});

export default api;
