
import * as Immutable from 'immutable';
import { Detector } from 'redux-detector';

/**
 * Higher order detector that checks if state has been changed (using Immutable.is)
 */
export function handleImmutableChangedDetector<T>(detector: Detector<T>): Detector<T> {
  return (prevState, nextState) => {
    // additional fast check - to reduce Immutable.is calls
    if (prevState !== nextState && !Immutable.is(prevState, nextState)) {
      return detector(prevState, nextState);
    }
  };
}
