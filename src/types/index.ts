export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
export interface IProduct {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
}

export type TPayment = 'card' | 'cash' | null;

export interface IBuyer {
  payment: TPayment;
  address: string | null;
  email: string | null;
  phone: string | null;
}

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderRequest {
  // данные покупателя
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}