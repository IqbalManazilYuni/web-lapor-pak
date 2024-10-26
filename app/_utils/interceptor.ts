// src/utils/axiosInstance.ts
import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        const token = session?.user?.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
