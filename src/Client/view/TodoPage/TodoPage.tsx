import * as React from 'react';
import { Component, ComponentClass, ReactElement } from 'react';
import { List } from 'immutable';
import { TodoList } from '../../module/Todo/component/TodoList/TodoList';
import { ResourceLoader } from 'Kernel/component/ResourceLoader/ResourceLoader';
import { Resource } from 'Kernel/model/Resource';
import { Todo } from '../../module/Todo/model/Todo';
import { connect } from 'react-redux';
import { ClientState } from '../../store/ClientState';
import { selectTodoListResource } from '../../module/Todo/selector/todoSelector';
import { todoToggled } from '../../module/Todo/action/todoAction';
import { Row, Col } from 'reactstrap';

export namespace TodoPage {
  export type StateProps = {
    todoListResource: Resource<List<Todo>>;
  };
  export type DispatchProps = {
    onTodoToggle: (index: number) => void;
  };

  export type Props = StateProps & DispatchProps;
}

export class TodoPageDumb extends Component<TodoPage.Props> {
  render(): ReactElement<any> {
    return (
      <Row>
        <Col xs='12'>
          <h1>Todo page</h1>
        </Col>
        <Col xs='12'>
          <ResourceLoader
            resource={ this.props.todoListResource }
            content={ (list) => <TodoList list={ list } onItemToggle={ this.props.onTodoToggle }/> }
          />
        </Col>
      </Row>
    );
  }
}

export const TodoPage: ComponentClass<{}> = connect(
  (state: ClientState): TodoPage.StateProps => ({
    todoListResource: selectTodoListResource(state)
  }),
  (dispatch): TodoPage.DispatchProps => ({
    onTodoToggle: (index) => dispatch(todoToggled(index))
  })
)(TodoPageDumb);
