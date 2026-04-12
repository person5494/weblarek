import { IBuyer, TPayment } from "../../types";

export class BuyerModel {
  private payment: TPayment = null;
  private address: string | null = null;
  private email: string | null = null;
  private phone: string | null = null;

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
    this.payment = data.payment ?? null;
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
      this.payment = null;
      this.address = null;
      this.email = null;
      this.phone = null;
    };
  
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (this.payment === null) errors.payment = 'Не выбран способ оплаты';
    if (!this.address) errors.address = 'Введите адрес';
    if (!this.email) errors.email = 'Введите email';
    if (!this.phone) errors.phone = 'Введите телефон';

    return errors;
  };
}