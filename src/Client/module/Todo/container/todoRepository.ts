import { TodoRepository } from '../repository/TodoRepository';
import { todoApi } from './todoApi';
import { todoMapper } from './todoMapper';

export const todoRepository: TodoRepository = new TodoRepository(todoApi, todoMapper);
