
import { ThunkAction } from 'redux-thunk';
import { ClientContainer } from '../container/index.d';
import { ClientState } from './ClientState';

export type ClientThunk<T = any> = ThunkAction<T, ClientState, ClientContainer>;
