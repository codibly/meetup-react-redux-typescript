
import { List } from 'immutable';
import * as React from 'react';
import { SFC } from 'react';
import { TodoForm } from 'Client/component/TodoForm/TodoForm';
import { Todo } from '../../model/Todo';
import { TodoList } from '../TodoList/TodoList';

export namespace TodoApp {
  export type StateProps = {
    todos: List<Todo>;
  };
  export type DispatchProps = {
    onTodoClick: (index: number) => void;
    onTodoAdd: (newContent: string) => void;
  };
  export type Props = StateProps & DispatchProps;
}

export const TodoApp: SFC<TodoApp.Props> = (props) => (
  <div>
    <h1>Todo App</h1>
    <h2>{ props.todos.filter(todo => todo.isDone()).size } / { props.todos.size } done</h2>
    <TodoList todos={ props.todos } onTodoClick={ props.onTodoClick }/>
    <TodoForm onSubmit={ props.onTodoAdd }/>
  </div>
);
