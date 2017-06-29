
import { Detector, reduceDetectors } from 'redux-detector';
import { ClientState } from '../store/ClientState';
import { todoDetector } from '../module/Todo/detector/todoDetector';

export const clientDetector: Detector<ClientState> = reduceDetectors(
  todoDetector
);
