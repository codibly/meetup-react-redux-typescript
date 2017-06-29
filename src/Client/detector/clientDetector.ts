
import { reduceDetectors, Detector } from 'redux-detector';
import { ClientState } from '../store/ClientState';

export const clientDetector: Detector<ClientState> = reduceDetectors();
