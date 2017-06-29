
import * as React from 'react';
import { StatelessComponent } from 'react';
import { Fragment } from 'redux-little-router';
import { TodoPage } from '../TodoPage/TodoPage';
import { Container } from 'reactstrap';

export const App: StatelessComponent<{}> = () => (
  <Fragment forRoute='/'>
    <Container>
      <TodoPage/>
    </Container>
  </Fragment>
);
