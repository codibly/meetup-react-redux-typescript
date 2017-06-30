
import { List } from 'immutable';
import { Todo } from '../model/Todo';

export namespace TodoState {
  export type TodoList = List<Todo>;
}

export type TodoState = {
  list?: TodoState.TodoList
};
