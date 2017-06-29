
import { Action } from 'redux-actions';
import { createAsyncActionCreator } from 'Kernel/action/asyncAction';
import { ClientThunk } from '../../../store/ClientThunk';

// Client/Todo/TODO_LIST_TOGGLED
export const TODO_TOGGLED = 'Client/Todo/TODO_TOGGLED';
export type TodoToggled = Action<{
  index: number;
}>;

export const todoToggled = (index: number): TodoToggled => ({
  type: TODO_TOGGLED,
  payload: { index }
});

// Client/Todo/TODO_LIST_FETCH
export const TODO_LIST_FETCH = 'Client/Todo/TODO_LIST_FETCH';
export const todoListFetch = createAsyncActionCreator(TODO_LIST_FETCH);

export const fetchTodoList = (): ClientThunk<Promise<any>> => (
  (dispatch, getState, container) => {
    dispatch(todoListFetch.pending());
    return container.todoRepository.getList()
      .then(todos => dispatch(todoListFetch.resolved(todos)))
      .catch(error => dispatch(todoListFetch.rejected(error)));
  }
);
