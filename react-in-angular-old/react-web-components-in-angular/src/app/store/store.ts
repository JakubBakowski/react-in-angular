import { Store } from '@ngrx/store';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createSyncMiddleware } from './sync.middleware';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state: { count: number; }) => {
      state.count += 1;
    },
  }
});

export const createReduxStore = (ngStore: Store) => {
    return configureStore({
      reducer: {
        counter: counterSlice.reducer
      },
      middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(createSyncMiddleware(ngStore) as any)
    });
  };

export const { increment } = counterSlice.actions;