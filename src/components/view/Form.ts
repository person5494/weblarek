import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { TPayment } from '../../types';
import { IFormState, IOrderForm, IContactsForm } from '../../types';

export abstract class FormBase<T> extends Component<T & IFormState> {
  protected form: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected formErrors: HTMLElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.form = container;

    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );

    this.formErrors = ensureElement<HTMLElement>(
      '.form__errors',
      this.container,
    );
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.formErrors.textContent = value;
  }
}

export class OrderForm extends FormBase<IOrderForm> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container,
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container,
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );

    this.cardButton.addEventListener('click', () => {
      this.events.emit('order.payment:change', { payment: 'card' });
    });

    this.cashButton.addEventListener('click', () => {
      this.events.emit('order.payment:change', { payment: 'cash' });
    });

    this.addressInput.addEventListener('input', () => {
      this.events.emit('order.address:change', {
        address: this.addressInput.value,
      });
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('order:submit');
    });
  }

  set payment(value: TPayment | null) {
    this.cardButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}

export class ContactsForm extends FormBase<IContactsForm> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    this.emailInput.addEventListener('input', () => {
      this.events.emit('contacts.email:change', {
        email: this.emailInput.value,
      });
    });

    this.phoneInput.addEventListener('input', () => {
      this.events.emit('contacts.phone:change', {
        phone: this.phoneInput.value,
      });
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('contacts:submit');
    });
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
