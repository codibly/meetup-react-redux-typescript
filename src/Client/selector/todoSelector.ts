
import { List } from 'immutable';
import { createSelector, Selector } from 'reselect';
import { Todo } from '../model/Todo';
import { ClientState } from '../store/ClientState';
import { TodoState } from '../store/TodoState';

export const selectTodoDomain: Selector<ClientState, TodoState> = state => state.todo || {};

export const selectTodoList = createSelector(
  selectTodoDomain,
  domain => domain.list || List<Todo>()
);
