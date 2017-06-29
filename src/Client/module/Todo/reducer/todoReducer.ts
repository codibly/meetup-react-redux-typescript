import { Reducer } from 'redux';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'Kernel/reducer/combineReducers';
import { createMatchInListReducer } from 'Kernel/reducer/iterableReducer';
import { reduceReducers } from 'Kernel/reducer/reduceReducers';
import { createResourceContentReducer, createResourceFetchReducer } from 'Kernel/reducer/resourceReducer';
import { TodoToggled, TODO_LIST_FETCH, TODO_TOGGLED } from '../action/todoAction';
import { Todo } from '../model/Todo';
import { TodoState } from '../store/TodoState';

// Client/Todo/TODO_TOGGLED
export const todoToggledItemReducer = handleAction(
  TODO_TOGGLED,
  createResourceContentReducer(
    createMatchInListReducer<Todo, TodoToggled>(
      (todo, index, action) => action.payload.index === index,
      (todo, action) => todo.toggle()
    )
  ),
  TodoState.INITIAL_TODO_LIST_RESOURCE
);

// Client/Todo/TODO_LIST_FETCH
export const todoListFetchReducer = handleAction(
  TODO_LIST_FETCH,
  createResourceFetchReducer(),
  TodoState.INITIAL_TODO_LIST_RESOURCE
);

export const todoReducer: Reducer<TodoState> = combineReducers({
  todo: combineReducers({
    todoListResource: reduceReducers(
      todoListFetchReducer,
      todoToggledItemReducer
    )
  })
});
