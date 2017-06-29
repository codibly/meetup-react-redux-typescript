// Typings for version 13.1.2
declare module 'redux-little-router' {
  import { Reducer, Middleware, StoreEnhancer, Action, Store } from 'redux';
  import { Component, ComponentClass, MouseEventHandler, ReactNode } from 'react';
  import { Location as HistoryLocation } from 'history';

  type Query = { [key: string]: string };
  type Params = { [key: string]: string };

  type LocationOptions = {
    persistQuery?: boolean
  };

  export type Location = HistoryLocation & {
    basename?: string,
    options?: LocationOptions,
    params?: Params,
    previous?: Location,
    query?: Query,
    result?: any;
    route?: string;
  };

  export type Href = string | Location;

  export const LOCATION_CHANGED: string;
  export const PUSH: string;
  export const REPLACE: string;
  export const GO: string;
  export const GO_BACK: string;
  export const GO_FORWARD: string;

  export type BareAction = {
    type: 'ROUTER_GO_BACK' | 'ROUTER_GO_FORWARD'
  };

  export type IndexedAction = {
    type: 'ROUTER_GO',
    payload: number
  };

  export type LocationAction = {
    type: 'ROUTER_LOCATION_CHANGED' | 'ROUTER_PUSH' | 'ROUTER_REPLACE',
    payload: Location
  };

  export type RouterAction = BareAction | IndexedAction | LocationAction;

  // actions
  export const push: (href: Href, options: LocationOptions) => Action;
  export const replace: (href: Href, options: LocationOptions) => Action;
  export const go: (index: number) => Action;
  export const goBack: () => Action;
  export const goForward: () => Action;
  export const locationDidChange: (location: Location) => Action;
  export const initializeCurrentLocation: (location: Location) => Action;

  // router
  type Router = {
    reducer: Reducer<any>,
    middleware: Middleware,
    enhancer: StoreEnhancer<any>
  };

  // environment/browser-router
  type BrowserRouterArgs = {
    routes: any,
    basename?: string,
    getLocation?: () => Location,
    passRouterStateToReducer?: boolean
  };

  export const routerForBrowser: (args: BrowserRouterArgs) => Router;

  // environment/express-router
  type ExpressRouterArgs = {
    routes: any,
    request: {
      path: string,
      baseUrl?: string,
      url: string,
      query: {[key: string]: string}
    },
    passRouterStateToReducer?: boolean
  };
  export const routerForExpress: (args: ExpressRouterArgs) => Router;

  // environment/hapi-router
  type HapiRouterArgs = {
    routes: Object,
    request: {
      path: string,
      url: string,
      query: { [key: string]: string }
    }
  };
  export const routerForHapi: (args: HapiRouterArgs) => Router;

  // components/fragment
  type FragmentProps = {
    location?: Location,
    matchRoute?: Function,
    matchWildcardRoute?: Function,
    forRoute?: string,
    parentRoute?: string,
    withConditions?: (location: Location) => boolean,
    parentId?: string,
    children?: JSX.Element
  };

  export class Fragment extends Component<FragmentProps, {}> {}

  // components/link
  type LinkProps = {
    children?: ReactNode | ReactNode[],
    className?: string,
    href: Href,
    persistQuery?: boolean,
    replaceState?: boolean,
    target?: string,
    onClick?: MouseEventHandler<any>,
    style?: Object
  };

  type PersistentQueryLinkProps = {
    children?: ReactNode | ReactNode[],
  };

  export class Link extends Component<LinkProps, {}> {}
  export class PersistentQueryLink extends Component<PersistentQueryLinkProps, {}> {}

  // components/provider
  type ProviderProps = {
    store: Store<any>,
    children?: JSX.Element
  };

  export class RouterProvider extends Component<ProviderProps, {}> {}

  type ProvideArgs = {
    store: Store<any>
  };
  export const provide: (args: ProvideArgs) => (component: ComponentClass<any>) => Component<any, any>;
}
