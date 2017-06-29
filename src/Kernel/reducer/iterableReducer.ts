
import { Iterable, List } from 'immutable';
import { Reducer } from 'redux';

export type MatchInIterableMatcher<K, V, A> = (item: V, key: K, action: A) => boolean;

/**
 * Create higher order reducer to reduce iterable items, matched by match function
 */
export function createMatchInIterableReducer<I extends Iterable<K, V>, K, V, A>(
  match: MatchInIterableMatcher<K, V, A>,
  reducer: (item: V, action: A) => V,
  notSetValue?: I
): Reducer<I> {
  return (iterable = notSetValue, action: any) => {
    if (iterable && iterable.some((item, key) => match(item, key, action))) {
      return iterable.map((item, key) => {
        if (match(item, key, action)) {
          return reducer(item, action);
        }

        return item;
      }) as I;
    }

    return iterable;
  };
}

/**
 * Create reducer to reduce list items, matched by match function
 */
export function createMatchInListReducer<V, A = any>(
  match: MatchInIterableMatcher<number, V, A>,
  reducer: (item: V, action: A) => V,
  notSetValue: List<V> = List<V>()
): Reducer<List<V>> {
  return createMatchInIterableReducer<List<V>, number, V, A>(match, reducer, notSetValue);
}
