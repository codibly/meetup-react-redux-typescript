// application entry file
import * as React from 'react';
import { ComponentClass } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as StoreProvider, StatelessComponent } from 'react-redux';
import { createDetectorEnhancer } from 'redux-detector';
import { applyMiddleware, compose, createStore, Store, StoreEnhancer } from 'redux';
import { routerForBrowser, RouterProvider } from 'redux-little-router';
import thunkMiddleware from 'redux-thunk';
import { App } from 'Client/view/App/App';

import { initializeCurrentLocation } from 'redux-little-router';
import { clientReducer } from 'Client/reducer/clientReducer';
import { clientDetector } from 'Client/detector/clientDetector';
import * as clientContainer from 'Client/container';
import { ClientState } from 'Client/store/ClientState';
import { combineReducers } from 'Kernel/reducer/combineReducers';
import { reduceReducers } from 'Kernel/reducer/reduceReducers';
import routes from '../route/client';

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer
} = routerForBrowser({ routes });

if (!(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  // tslint:disable-next-line:no-console
  console.log('Download the Redux DevTools for a better development experience: https://github.com/zalmoxisus/redux-devtools-extension');
}

const composeEnhancers = window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer: StoreEnhancer<ClientState> = composeEnhancers(
  routerEnhancer,
  createDetectorEnhancer(clientDetector),
  applyMiddleware(
    routerMiddleware,
    thunkMiddleware.withExtraArgument(clientContainer)
  )
);

const store: Store<ClientState> = createStore(
  reduceReducers<ClientState>(
    combineReducers<ClientState>({
      router: routerReducer
    }),
    clientReducer
  ),
  {} as ClientState,
  enhancer
);

function render(Component: ComponentClass<any> | StatelessComponent<any>, root: HTMLElement): void {
  ReactDOM.render(
    <StoreProvider store={ store }>
      <RouterProvider store={ store }>
        <Component/>
      </RouterProvider>
    </StoreProvider>,
    root
  );
}

const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}
store.dispatch(initializeCurrentLocation(store.getState().router));

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.getElementById('root');

  if (root) {
    render(App, root);

    if (module && module.hot) {
      module.hot.accept('Client/view/App/App', () => {
        render(App, root);
      });
    }
  } else {
    // tslint:disable-next-line:no-console
    console.error('Cannot mount React application - there is no #root element in document body.');
  }
});