
// members fetch
import { Action, ActionMeta } from 'redux-actions';

export interface AsyncAction<T> extends Action<T> {
  pending?: boolean;
}

export interface AsyncActionMeta<T, M> extends AsyncAction<T>, ActionMeta<T, M> {}

export interface AsyncActionCreator<T> {
  pending: () => AsyncAction<T>;
  resolved: (payload?: T) => AsyncAction<T>;
  rejected: (payload?: any) => AsyncAction<T>;
}

export interface AsyncActionCreatorMeta<T, M> extends AsyncActionCreator<T> {
  pending: (meta?: M) => AsyncActionMeta<T, M>;
  resolved: (payload?: T, meta?: M) => AsyncActionMeta<T, M>;
  rejected: (payload?: any, meta?: M) => AsyncActionMeta<T, M>;
}

export function createAsyncActionCreator(type: string): AsyncActionCreatorMeta<any, any> {
  return {
    pending: (meta = {}) => ({ type, meta, pending: true }),
    resolved: (payload?, meta = {}) => ({ type, payload, meta }),
    rejected: (payload?, meta = {}) => ({ type, payload, meta, error: true })
  };
}
