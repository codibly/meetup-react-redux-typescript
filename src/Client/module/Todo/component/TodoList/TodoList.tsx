import { List } from 'immutable';
import * as React from 'react';
import { StatelessComponent } from 'react';
import { Todo } from '../../model/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { StyledList, Wrapper } from './TodoList.s';

export namespace TodoList {
  export type Props = {
    list: List<Todo>;
    onItemToggle: (index: number, done: boolean) => void;
  };
}

export const TodoList: StatelessComponent<TodoList.Props> = props => (
  <Wrapper>
    <h1>
      Todo list •
      { props.list.filter(todo => todo!.isDone()).size }/{ props.list.size } done
    </h1>
    <StyledList>
      { props.list.map((todo, index) => (
        <TodoItem
          key={ index }
          item={ todo! }
          onToggle={ done => props.onItemToggle(index!, done) }
        />
      )) }
    </StyledList>
  </Wrapper>
);
