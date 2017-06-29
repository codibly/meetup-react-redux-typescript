
import { Reducer } from 'redux';
import { ClientState } from '../store/ClientState';
import { todoReducer } from '../module/Todo/reducer/todoReducer';
import { reduceReducers } from 'Kernel/reducer/reduceReducers';

export const clientReducer: Reducer<ClientState> = reduceReducers(
  todoReducer
);
