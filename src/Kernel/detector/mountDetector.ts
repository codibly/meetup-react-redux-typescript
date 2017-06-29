
import { Detector } from 'redux-detector';

/**
 * Higher order detector that checks if state has been mounted - good choice for initial check
 */
export function handleStateMountedDetector<T>(detector: Detector<T>): Detector<T> {
  return (prevState, nextState) => {
    if (undefined === prevState && undefined !== nextState) {
      return detector(prevState, nextState);
    }
  };
}
