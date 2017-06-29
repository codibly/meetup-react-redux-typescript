
import * as React from 'react';
import { SFC } from 'react';
import { Fragment } from 'redux-little-router';
import { AppContainer } from './App.s';

export const App: SFC = () => (
  <Fragment forRoute='/'>
    <AppContainer>
      Hello world!
    </AppContainer>
  </Fragment>
);
