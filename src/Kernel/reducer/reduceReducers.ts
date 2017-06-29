
import { Reducer } from 'redux';

/**
 * Reduce reducers to reduce state in sequence.
 */
export function reduceReducers<T>(...reducers: Reducer<T>[]): Reducer<T> {
  return (state: T, action: any): T => {
    return reducers.reduce(
      (reducedState: T, reducer: Reducer<T>) => reducer(reducedState, action),
      state
    );
  };
}
