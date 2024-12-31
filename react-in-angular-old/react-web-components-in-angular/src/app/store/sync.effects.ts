import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Store } from '@reduxjs/toolkit';

const actionMap: { [key: string]: string } = {
  '[Counter] Increment': 'counter/increment',
};

export const REDUX_STORE = 'Redux_Store';

@Injectable()
export class SyncEffects {
  constructor(
    private actions$: Actions,
    @Inject(REDUX_STORE) private reduxStore: Store
  ) {}

  syncToRedux$ = createEffect(() => 
    this.actions$.pipe(
      tap(action => {
        const reduxActionType = actionMap[action.type] || action.type;
        console.log('reduxActionType', reduxActionType);
        this.reduxStore.dispatch({
          type: reduxActionType,
          payload: (action as any).payload
        });
      })
    ),
    { dispatch: false }
  );
} 