
import { Action } from 'redux-actions';

export const TOGGLE_TODO = 'TOGGLE_TODO';
export type ToggleTodoAction = Action<number>;
export const toggleTodo = (index: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: index
});

export const ADD_TODO = 'ADD_TODO';
export type AddTodoAction = Action<string>;
export const addTodo = (newContent: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: newContent
});
