import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Middleware } from 'redux';

const actionMap: { [key: string]: string } = {
  'counter/increment': '[Counter] Increment',  // Redux action : NgRx action
  // Add more mappings as needed
};

export const createSyncMiddleware = (ngStore: Store): Middleware => {
  return store => next => action => {
    // Forward Redux actions to NgRx
    if(actionMap[action.type]) {
      const ngRxActionType = actionMap[action.type] || action.type;
      console.log('dispatching action', ngRxActionType);
      ngStore.dispatch({ type: ngRxActionType, payload: action.payload });
    }
    return next(action);
  };
};