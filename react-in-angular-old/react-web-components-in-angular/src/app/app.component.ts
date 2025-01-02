import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from './store/actions/counter.actions';
import { createReduxStore } from './store/store';
import { REDUX_STORE } from './store/sync.effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public counter$: Observable<number>;
  
  constructor(
    public store: Store<{ counter: { count: number } }>,
    @Inject(REDUX_STORE) public reduxStore: any
  ) {
    this.counter$ = store.select(state => state.counter.count);
  }

  public handleOnClick() {
    this.store.select(state => state.counter.count).subscribe(value => {
    });
    // this.store.dispatch(CounterActions.increment());
  }
}
