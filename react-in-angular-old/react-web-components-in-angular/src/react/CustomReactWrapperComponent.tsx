import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges,
  OnDestroy, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomReactButton } from "./customReactButton";
import { Provider } from 'react-redux';
import { Store } from '@ngrx/store';
import { createReduxStore } from '../app/store/store';
import { REDUX_STORE } from "src/app/store/sync.effects";

const containerElementRef = "customReactComponentContainer";

@Component({
  selector: "app-my-component",
  template: `<span #${containerElementRef}></span>`,
  // styleUrls: [""],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: REDUX_STORE,
      useFactory: (ngStore: Store) => createReduxStore(ngStore),
      deps: [Store]
    }
  ]
})
export class CustomReactWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, { static: true }) containerRef!: ElementRef;

  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();

  private reduxStore;

  constructor(private ngStore: Store) {
    this.reduxStore = createReduxStore(ngStore);
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    if (this.componentClick) {
      this.componentClick.emit();
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const { counter } = this;

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={this.reduxStore}>
          <div>
            <CustomReactButton
              onClick={this.handleClick}
            />
          </div>
        </Provider>
      </React.StrictMode>,
      this.containerRef.nativeElement
    );
  }
}
