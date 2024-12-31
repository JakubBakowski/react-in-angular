import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomReactWrapperComponent } from 'src/react/CustomReactWrapperComponent';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/reducers/counter.reducer';
import { SyncEffects } from './store/sync.effects';
import { createReduxStore } from './store/store';
import { REDUX_STORE } from './store/sync.effects';

@NgModule({
  declarations: [
    AppComponent,
    CustomReactWrapperComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({counter: counterReducer }),  // Pass your reducers here
    EffectsModule.forRoot([SyncEffects]), // Pass your effects here
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    AppRoutingModule
  ],
  providers: [{ provide: REDUX_STORE,
    useValue: createReduxStore}],
  bootstrap: [AppComponent]
})
export class AppModule { }

