import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Middleware } from 'redux';

const actionMap: { [key: string]: string } = {
  'counter/increment': '[Counter] Increment',  // Redux action : NgRx action
  // Add more mappings as needed
};

export const createSyncMiddleware = (ngStore: Store): Middleware => {
  return store => next => action => {
    const ngRxActionType = actionMap[action.type] || action.type;
    // Forward Redux actions to NgRx
    ngStore.dispatch({ type: ngRxActionType, payload: action.payload });
    return next(action);
  };
};