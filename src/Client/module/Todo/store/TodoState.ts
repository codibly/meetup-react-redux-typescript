
import { List } from 'immutable';
import { Resource } from 'Kernel/model/Resource';
import { Todo } from '../model/Todo';

export namespace TodoState {
  export type TodoList = List<Todo>;
  export type TodoListResource = Resource<TodoList>;

  export type Domain = {
    todoListResource: TodoListResource;
  };

  export const INITIAL_TODO_LIST_RESOURCE: TodoListResource = Resource.void<TodoList>();
  export const INITIAL_DOMAIN: Domain = {
    todoListResource: INITIAL_TODO_LIST_RESOURCE
  };
}

export type TodoState = {
  todo?: TodoState.Domain;
};
