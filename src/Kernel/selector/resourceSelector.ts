
import { createSelector, Selector } from 'reselect';
import { Resource } from '../model/Resource';

export function createResourceContentSelector<S, C>(
  resourceSelector: Selector<S, Resource<C>>,
  notSetContent?: C
): Selector<S, C> {
  return createSelector(
    resourceSelector,
    resource => resource ? resource.getContent(notSetContent) : notSetContent
  );
}

export function createResourceParametersSelector<S, P>(
  resourceSelector: Selector<S, Resource<any, P>>,
  notSetParameters?: P
): Selector<S, P> {
  return createSelector(
    resourceSelector,
    resource => resource ? resource.getParameters(notSetParameters) : notSetParameters
  );
}

export function createResourceOptimisticParametersSelector<S, P>(
  resourceSelector: Selector<S, Resource<any, P>>,
  notSetParameters?: P
): Selector<S, P> {
  return createSelector(
    resourceSelector,
    resource => resource ? resource.getOptimisticParameters(notSetParameters) : notSetParameters
  );
}
