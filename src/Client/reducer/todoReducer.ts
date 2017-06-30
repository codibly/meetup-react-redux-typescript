
import { List } from 'immutable';
import { handleAction } from 'redux-actions';
import { combineReducers } from '../../Kernel/reducer/combineReducers';
import { reduceReducers } from '../../Kernel/reducer/reduceReducers';
import { AddTodoAction, ADD_TODO, ToggleTodoAction, TOGGLE_TODO } from '../action/todoAction';
import { Todo } from '../model/Todo';
import { TodoState } from '../store/TodoState';

const initialList: TodoState.TodoList = List([
  new Todo({ content: 'Przeprowadzic meetup', done: false }),
  new Todo({ content: 'Stworzyc aplikacje reactowa', done: true })
]);

export const toggleTodoReducer = handleAction(
  TOGGLE_TODO,
  (list: TodoState.TodoList, action: ToggleTodoAction) => (
    list.update(action.payload, todo => todo.toggle())
  ),
  initialList
);

export const addTodoReducer = handleAction(
  ADD_TODO,
  (list: TodoState.TodoList, action: AddTodoAction) => (
    list.push(new Todo({ content: action.payload, done: false }))
  ),
  initialList
);

export const todoReducer = combineReducers<TodoState>({
  list: reduceReducers(
    toggleTodoReducer,
    addTodoReducer
  )
});
