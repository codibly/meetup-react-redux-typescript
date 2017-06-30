import * as React from 'react';
import { Component, FormEvent, ReactElement } from 'react';
import { AddInput } from './TodoForm.s';

namespace TodoForm {
  export type Props = {
    onSubmit: (newContent: string) => void;
  };

  export type State = {
    newContent: string;
  };
}

export class TodoForm extends Component<TodoForm.Props, TodoForm.State> {
  state: TodoForm.State = {
    newContent: ''
  };

  render(): ReactElement<any> {
    return (
      <form onSubmit={ this.handleFormSubmit }>
        <AddInput
          type='text'
          placeholder='New todo'
          value={ this.state.newContent }
          onChange={ event => this.setState({ newContent: event.target.value }) }
        />
      </form>
    );
  }

  private handleFormSubmit = (event: FormEvent<any>): void => {
    event.preventDefault();

    if (this.state.newContent !== '') {
      this.props.onSubmit(this.state.newContent);
      this.setState({ newContent: '' });
    }
  }
}
