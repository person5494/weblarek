import { IProduct } from "../../types";

export class CatalogModel {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor() {};

setProducts(products: IProduct[]): void {
  this.products = products;
};
getProducts(): IProduct[] {
  return this.products;
};
setSelectedProduct(product: IProduct): void {
  this.selectedProduct = product;
};
getSelectedProduct(): IProduct | null {
  return this.selectedProduct;
};
getProductById(productId: string): IProduct | undefined {
  return this.products.find(product => product.id === productId);
}
}