
import { Reducer } from 'redux';
import { combineReducers } from '../../Kernel/reducer/combineReducers';
import { ClientState } from '../store/ClientState';
import { todoReducer } from './todoReducer';

export const clientReducer: Reducer<ClientState> = combineReducers({
  todo: todoReducer
});
