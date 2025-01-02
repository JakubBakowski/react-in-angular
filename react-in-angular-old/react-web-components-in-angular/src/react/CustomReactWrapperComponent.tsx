import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges,
  OnDestroy, Output, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomReactButton } from "./customReactButton";
import { Store } from "@ngrx/store";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
const containerElementRef = "customReactComponentContainer";

@Component({
  selector: "app-my-component",
  template: `<span #${containerElementRef}></span>`,
  // styleUrls: [""],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementRef, { static: true }) containerRef!: ElementRef;

  @Input() public counter = 10;
  @Input() public store: any;
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
            <CustomReactButton
              onClick={this.handleClick}
              />
          </div>
              </Provider>
      </React.StrictMode>
    );
  }
}

