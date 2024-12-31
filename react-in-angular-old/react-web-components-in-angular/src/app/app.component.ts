import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from './store/actions/counter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public counter$: Observable<number>;

  constructor(private store: Store<{ counter: { count: number } }>) {
    this.counter$ = store.select(state => state.counter.count);
  }

  public handleOnClick() {
    console.log('handleOnClick');
    this.store.select(state => state.counter.count).subscribe(value => {
      console.log('Counter value:', value);
    });
    this.store.dispatch(CounterActions.increment());
  }
}
