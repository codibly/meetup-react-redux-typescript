import * as React from 'react';
import { StatelessComponent } from 'react';
import { Todo } from '../../model/Todo';
import { StyledCheckbox, StyledItem } from './TodoItem.s';

export namespace TodoItem {
  export type Props = {
    item: Todo;
    onToggle: (done: boolean) => void;
  };
}

export const TodoItem: StatelessComponent<TodoItem.Props> = props => (
  <StyledItem
    isDone={ props.item.isDone() }
    onClick={ () => props.onToggle(!props.item.isDone()) }
  >
    <StyledCheckbox
      type='checkbox'
      checked={ props.item.isDone() }
    />
    { props.item.getName() }
  </StyledItem>
);
