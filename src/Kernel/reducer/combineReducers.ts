
import { Action, Reducer } from 'redux';

type ReducersMap<S> = {
  [K in keyof S]?: Reducer<S[K]>;
};

/**
 * Combines reducers to reduce nested state
 */
export function combineReducers<S>(map: ReducersMap<S>, initialState: S = {} as S): Reducer<S> {
  const keys: Partial<keyof S>[] = Object.keys(map) as (keyof S)[];

  return (state: S = initialState, action: Action) => {
    let hasChanged: boolean = false;
    const next: S = Object.assign({}, state);

    keys.forEach((key) => {
      const prevState: S[keyof S] = state[key as keyof S];
      const nextState: S[keyof S] = map[key as keyof S](prevState, action);

      if (prevState !== nextState) {
        next[key] = nextState;
        hasChanged = true;
      }
    });

    return hasChanged ? next : state;
  };
}
