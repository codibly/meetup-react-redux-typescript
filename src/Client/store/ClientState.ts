
import { Location } from 'redux-little-router';
import { TodoState } from '../module/Todo/store/TodoState';

export type ClientState = TodoState & {
  router?: Location,
};
