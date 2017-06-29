
import { Reducer } from 'redux';
import { AsyncAction } from '../action/asyncAction';
import { AsyncModel } from '../model/AsyncModel';

/**
 * Creates reducer that reduces async model for async action
 * @see ../action/asyncAction.ts
 */
export function createAsyncModelReducer<T extends AsyncModel<any>>(type: string, initialModel?: T): Reducer<T> {
  return (model: T = initialModel, action: AsyncAction<any>) => {
    if (action.pending) {
      return model.beginAsync(type);
    }

    if (action.error) {
      return model.rejectAsync(type, action.payload);
    }

    return model.resolveAsync(type, action.payload);
  };
}
