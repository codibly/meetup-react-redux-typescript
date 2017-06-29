
import { Location } from 'redux-little-router';
import { createSelector, Selector } from 'reselect';

type RouterState = {
  router?: Location,
  [type: string]: any
};

export const selectRouter = (state: RouterState) => (state && state.router) || {} as Location;

export const selectRoute = createSelector(
  selectRouter,
  router => router.route
);

/**
 * Creates selector that checks if some of given routes matches current route.
 */
export const createIsMatchingRouteSelector = (
  ...routes: string[]
): Selector<RouterState, boolean> => {
  return createSelector(
    selectRoute,
    currentRoute => routes.some(route => route === currentRoute)
  );
};
