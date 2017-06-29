
import { Reducer } from 'redux';
import { reduceReducers } from 'Kernel/reducer/reduceReducers';
import { ClientState } from '../store/ClientState';

export const clientReducer: Reducer<ClientState> = reduceReducers();
