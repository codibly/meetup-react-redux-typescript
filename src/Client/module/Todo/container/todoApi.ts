import { apiClient } from 'Client/container/apiClient';
import { TodoApi } from '../api/TodoApi';

export const todoApi: TodoApi = new TodoApi(apiClient);
