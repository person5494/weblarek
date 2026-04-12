import { IBuyer, TPayment } from "../../types";

export class BuyerModel {
  private payment: TPayment = '';
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor() {}

  update(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    if (data.address !== undefined) {
      this.address = data.address;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
  };

  setData(data: IBuyer): void {
    this.payment = data.payment;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
  };

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone
    };
  };

  clear(): void {
      this.payment = '';
      this.address = '';
      this.email = '';
      this.phone = '';
    };
  
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) errors.payment = 'Не выбран способ оплаты';
    if (!this.address) errors.address = 'Введите адрес';
    if (!this.email) errors.email = 'Введите email';
    if (!this.phone) errors.phone = 'Введите телефон';

    return errors;
  };
}