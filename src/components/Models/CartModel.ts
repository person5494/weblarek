import { IProduct } from "../../types";

export class CartModel {
  private items: IProduct[] = [];

  constructor() {}

addItem(product: IProduct): void {
  if(!this.canAddItem(product.id)) return;
  this.items.push(product);
};
removeItem(product: IProduct): void {
  this.items.filter(item => item.id !== product.id);
};
getItemsCount(): number {
  return this.items.length;
};
getItems(): IProduct[] {
  return this.items;
};
getTotalPrice(): number {
  return this.items.reduce((sum, item) => {
    return sum + (item.price ?? 0);
  }, 0);
};
canAddItem(productId: string): boolean {
  return !this.items.some(item => item.id === productId);
};
clearCart(): void {
  this.items = [];
}
}