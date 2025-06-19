import axios from 'axios';
import Cookies from 'js-cookies/src/cookies.js';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

      window.location.href = '/user/auth/login';
      throw new axios.Cancel('Нет access токена');
    }
  } else {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.getItem('refreshToken');

        const response = await axiosClient.post('/user/auth/token', {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        Cookies.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        Cookies.removeItem('accessToken');
        Cookies.removeItem('refreshToken');
        Cookies.removeItem('userEmail');
        Cookies.removeItem('userName');

        window.location.href = '/user/auth/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
