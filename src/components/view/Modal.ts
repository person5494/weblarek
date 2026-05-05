import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)
    
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)

    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container)
    
    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  open() {
    this.container.classList.add('modal_active');
  };
  
  close() {
    this.container.classList.remove('modal_active');
    this.contentElement.replaceChildren();
    this.events.emit('modal:close');
  }
}