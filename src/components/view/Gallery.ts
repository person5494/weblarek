import { Component } from "../base/Component";

export interface IGallery {
  element: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  
  constructor(container: HTMLElement) {
    super(container);
  }

  set catalog(value: HTMLElement[]) {
    this.container.replaceChildren(...value);
  }
}