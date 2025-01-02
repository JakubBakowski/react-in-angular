import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges,
  OnDestroy, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomReactButton2 } from "./customReactButton2";
import { Store } from "@ngrx/store";
import { Provider } from "react-redux";
import { createReduxStore } from "src/app/store/store";
import { createRoot } from 'react-dom/client';
const containerElementRef = "customReactComponentContainer2";

@Component({
  selector: "app-my-component2",
  template: `<span #${containerElementRef}></span>`,
  // styleUrls: [""],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactWrapperComponent2 implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, { static: true }) containerRef!: ElementRef;

  @Input() public store: any;
  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();


  constructor() {
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

  private root: any;
  private render() {
    const { counter } = this;
    if (!this.root) {
      this.root = createRoot(this.containerRef.nativeElement);
    }
    const root = this.root;

    root.render(
      <React.StrictMode>
          <Provider store={this.store}>
            <div>
              <CustomReactButton2
                onClick={this.handleClick}
                />
            </div>
          </Provider>
      </React.StrictMode>,
    );
  }
}

