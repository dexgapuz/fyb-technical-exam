import axios, { AxiosError, type AxiosResponse } from 'axios';
import router from '../router';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: 'Login' });
    }

    throw error;
  }
);

export default axiosClient;
