import * as React from 'react';
import { SFC } from 'react';
import { ItemContent, ItemWrapper } from './TodoItem.s';

export namespace TodoItem {
  export type Props = {
    content: string;
    done: boolean;
    onClick: () => void;
  };
}

export const TodoItem: SFC<TodoItem.Props> = (props) => (
  <ItemWrapper done={ props.done } onClick={ props.onClick }>
    <input type='checkbox' checked={ props.done }/>
    <ItemContent>{ props.content }</ItemContent>
  </ItemWrapper>
);
