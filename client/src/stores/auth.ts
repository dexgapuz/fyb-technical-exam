import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import axiosClient from '../http/axios';
import type LoginRequest from '../interfaces/requests/LoginRequest';
import type RegisterRequest from '../interfaces/requests/RegisterRequest';
import type AuthResponse from '../interfaces/responses/AuthResponse';
import axios from 'axios';
import router from '../router';
import type User from '../interfaces/User';

const useAuthStore = defineStore('authStore', () => {
  const user = reactive({
    name: '',
    email: '',
    accessToken: localStorage.getItem('token'),
  });

  const errors = reactive({
    name: [],
    email: [],
    password: [],
  });

  const hasErrors = computed(
    () =>
      errors.email.length > 0 ||
      errors.name.length > 0 ||
      errors.password.length > 0
  );

  const authenticate = async (
    url: string,
    formData: LoginRequest | RegisterRequest
  ): Promise<void> => {
    try {
      const { data } = await axiosClient.post<AuthResponse>(url, formData);
      user.accessToken = data.accessToken;
      user.email = data.user.email;
      user.name = data.user.name;
      localStorage.setItem('token', data.accessToken);
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        errors.name = err.response?.data.errors.name || [];
        errors.email = err.response?.data.errors.email || [];
        errors.password = err.response?.data.errors.password || [];
      }
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axiosClient.get<User>('/api/users/me');
      user.email = data.email;
      user.name = data.name;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    axiosClient.post('/api/logout').then(() => {
      user.email = '';
      user.name = '';
      user.accessToken = '';
      resetError();
      localStorage.removeItem('token');
      router.push('/login');
    });
  };

  const resetError = () => {
    errors.email = [];
    errors.password = [];
    errors.name = [];
  };

  return { user, authenticate, errors, resetError, hasErrors, getUser, logout };
});

export default useAuthStore;
