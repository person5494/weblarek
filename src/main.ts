import './scss/styles.scss';
import { CatalogModel } from './components/Models/CatalogModel';
import { CartModel } from './components/Models/CartModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { apiProducts } from './utils/data';

const catalog = new CatalogModel();

catalog.setProducts(apiProducts.items);

console.log('Массив товаров из каталога: ', catalog.getProducts());

const product = catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');

if (product) catalog.setSelectedProduct(product);

console.log('Выбранный продукт: ', catalog.getSelectedProduct());

const cart = new CartModel();

if (product) cart.addItem(product);

console.log('В корзине находятся следующие товары: ', cart.getItems());

cart.clearCart();

console.log('Корзина после очистки: ', cart.getItems());

