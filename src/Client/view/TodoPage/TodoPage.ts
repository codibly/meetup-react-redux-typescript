
import { connect } from 'react-redux';
import { addTodo, toggleTodo } from '../../action/todoAction';
import { TodoApp } from '../../component/TodoApp/TodoApp';
import { selectTodoList } from '../../selector/todoSelector';
import { ClientState } from '../../store/ClientState';

export const TodoPage = connect(
  (state: ClientState): TodoApp.StateProps => ({
    todos: selectTodoList(state)
  }),
  (dispatch): TodoApp.DispatchProps => ({
    onTodoClick: (index) => dispatch(toggleTodo(index)),
    onTodoAdd: (newContent) => dispatch(addTodo(newContent))
  })
)(TodoApp);
