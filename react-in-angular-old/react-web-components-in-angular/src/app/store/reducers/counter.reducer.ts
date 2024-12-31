import { createReducer, on } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

export interface State {
  count: number;
}

export const initialState: State = {
  count: 0
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, state => ({ ...state, count: state.count + 1 })),
  on(CounterActions.decrement, state => ({ ...state, count: state.count - 1 })),
  on(CounterActions.reset, state => ({ ...state, count: 0 }))
);