import { IBuyer, TPayment, TBuyerErrors } from "../../types";

export class BuyerModel {
  private payment: TPayment | null = null;
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor() {}

  update(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment ?? null;
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

  getData(): IBuyer {
    return {
      payment: this.payment as TPayment,
      address: this.address,
      email: this.email,
      phone: this.phone
    };
  };

  clear(): void {
      this.payment = null;
      this.address = '';
      this.email = '';
      this.phone = '';
    };
  
  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.payment) errors.payment = 'Не выбран способ оплаты';
    if (!this.address.trim()) errors.address = 'Введите адрес';
    if (!this.email.trim()) errors.email = 'Введите email';
    if (!this.phone.trim()) errors.phone = 'Введите телефон';

    return errors;
  };
}