
import { Detector, mountDetector, reduceDetectors } from 'redux-detector';
import { TodoState } from '../store/TodoState';
import { selectTodoIsDisplayed } from '../selector/todoSelector';
import { handleImmutableChangedDetector } from '../../../../Kernel/detector/immutableDetector';
import { fetchTodoList } from '../action/todoAction';

export const todoDetector: Detector<TodoState> = reduceDetectors(
  mountDetector(selectTodoIsDisplayed, handleImmutableChangedDetector(() => fetchTodoList()))
);
