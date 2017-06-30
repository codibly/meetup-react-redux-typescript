import { List } from 'immutable';
import * as React from 'react';
import { SFC } from 'react';
import { Todo } from '../../model/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { ListWrapper } from './TodoList.s';

namespace TodoList {
  export type Props = {
    todos: List<Todo>;
    onTodoClick: (index: number) => void;
  };
}

export const TodoList: SFC<TodoList.Props> = (props) => (
  <ListWrapper>
    { props.todos.map((todo, index) => (
      <TodoItem
        key={ index }
        content={ todo.getContent() }
        done={ todo.isDone() }
        onClick={ () => props.onTodoClick(index) }
      />
    )) }
  </ListWrapper>
);
