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

export type TPayment = 'card' | 'cash';

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IBuyer {
  payment: TPayment | null;
  address: string;
  email: string;
  phone: string;
}

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderRequest extends IBuyer {
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}