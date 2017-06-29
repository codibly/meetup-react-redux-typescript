
import { Reducer } from 'redux';
import { Resource } from '../model/Resource';
import { createAsyncModelReducer } from './asyncModelReducer';

/**
 * Create resource reducer for fetch async action
 */
export function createResourceFetchReducer<T extends Resource<any, any>>(initialResource?: T): Reducer<T> {
  return createAsyncModelReducer<T>(Resource.FETCH, initialResource);
}

/**
 * Create higher order reducer to reduce resource content
 */
export function createResourceContentReducer<T extends Resource<C, any>, C>(
  reducer: Reducer<C>,
  initialResource?: T,
  notSetContent?: C
): Reducer<T> {
  return (resource: T = initialResource, action: any) => {
    if (resource) {
      return resource.updateContent(content => reducer(content, action), notSetContent);
    }

    return resource;
  };
}
