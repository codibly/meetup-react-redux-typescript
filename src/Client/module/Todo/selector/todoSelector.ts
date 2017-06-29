
import { createSelector } from 'reselect';
import { Resource } from 'Kernel/model/Resource';
import { TodoState } from '../store/TodoState';
import { createResourceContentSelector } from 'Kernel/selector/resourceSelector';
import { createIsMatchingRouteSelector } from 'Kernel/selector/locationSelector';
import { CLIENT_PATH } from '../../../../../app/route/client';

export function selectTodoDomain(state: TodoState): TodoState.Domain {
  return state && state.todo;
}

export const selectTodoListResource = createSelector(
  selectTodoDomain,
  domain => (domain && domain.todoListResource) || Resource.void<TodoState.TodoList>()
);

export const selectTodoIsDisplayed = createIsMatchingRouteSelector(
  CLIENT_PATH
);

export const selectTodoList = createResourceContentSelector(selectTodoListResource);
