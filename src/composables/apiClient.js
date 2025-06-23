import axios from 'axios';
import Cookies from 'js-cookies/src/cookies.js';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.getItem('accessToken');

  const skipAuthPaths = ['/user/auth/login', '/user/auth/login-code', '/user/auth/token'];
  const isSkipPath = skipAuthPaths.some((path) => config.url?.includes(path));

  if (!token || token.trim() === '') {
    if (!isSkipPath) {
      Cookies.removeItem('accessToken');
      Cookies.removeItem('refreshToken');

      window.location.href = '/login';
      throw new axios.Cancel('Нет access-токена');
    }
  } else {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
