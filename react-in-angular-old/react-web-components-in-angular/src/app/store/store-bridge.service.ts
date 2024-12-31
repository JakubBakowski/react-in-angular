import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreBridgeService {
  private counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  constructor(private store: Store<{ counter: { count: number } }>) {
    // Subscribe to NgRx store changes
    this.store.select(state => state.counter.count)
      .subscribe(count => {
        this.counterSubject.next(count);
      });
  }

  // Method to update NgRx store from React
  updateCounter(count: number) {
    // Dispatch your NgRx action here
    this.store.dispatch({ type: '[Counter] Set', payload: count });
  }
}