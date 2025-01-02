import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomReactWrapperComponent } from 'src/react/CustomReactWrapperComponent';
import { CustomReactWrapperComponent2 } from 'src/react/CustomReactWrapperComponent2';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { counterReducer } from './store/reducers/counter.reducer';
import { SyncEffects } from './store/sync.effects';
import { createReduxStore } from './store/store';
import { REDUX_STORE } from './store/sync.effects';
import { AngularReactModule } from '@bubblydoo/angular-react'

@NgModule({
  declarations: [
    AppComponent,
    CustomReactWrapperComponent,
    CustomReactWrapperComponent2,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({counter: counterReducer }),  // Pass your reducers here
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    AppRoutingModule,
    AngularReactModule,
    EffectsModule.forRoot([SyncEffects]), // Pass your effects here
  ],
  providers: [{ 
    provide: REDUX_STORE,
    useFactory: (store: Store) => createReduxStore(store),
    deps: [Store]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

