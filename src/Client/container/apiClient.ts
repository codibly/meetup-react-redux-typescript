import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: [
    `${process.env.API_CLIENT_SCHEMA || 'http'}://`,
    process.env.API_CLIENT_HOST,
    process.env.API_CLIENT_PORT ? `:${process.env.API_CLIENT_PORT}` : ''
  ].join('')
});
