
import { Location } from 'redux-little-router';
import { TodoState } from './TodoState';

export type ClientState = {
  router?: Location,
  todo?: TodoState
};
