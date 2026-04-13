import './scss/styles.scss';
import { CatalogModel } from './components/models/CatalogModel';
import { CartModel } from './components/models/CartModel';
import { BuyerModel } from './components/models/BuyerModel';
import { apiProducts } from './utils/data';
import { CommunicationService } from './components/services/CommunicationService';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';


// ----------Проверка класса CatalogModel----------

const catalog = new CatalogModel();

//Проверка метода setProducts 
catalog.setProducts(apiProducts.items);

//Проверка метода getProducts
console.log('Каталог товар (локальные данные): ', catalog.getProducts());

//Проверка метода getProductsById
const product = catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
console.log('Данный продукт выбран по ID: ', catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));

//Проверка метода setSelectedProduct
if (product) catalog.setSelectedProduct(product);

//Проверка метода getSelectedProduct
console.log('Выбранный продукт: ', catalog.getSelectedProduct());


// ----------Проверка класса CartModel----------

const cart = new CartModel();
let prod1 = catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
let prod2 = catalog.getProductById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7');
let prod3 = catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390');

if (prod1 && prod2 && prod3) {
  
  //Проверка метода addItem
  cart.addItem(prod1);
  cart.addItem(prod2);
  cart.addItem(prod3);
  
  //Проверка метода getItems
  console.log('В корзине находятся следующие товары: ', cart.getItems());
  
  //Проверка метода hasItem
  console.log('Есть ли товар с переданным ID в корзине? "true" - да, "false" - нет: ', cart.hasItem(prod1.id));
  
  //Проверка метода getItemsCount
  console.log('Количество товаров в корзине:', cart.getItemsCount(), 'шт');

  //Проверка метода getTotalPrice
  console.log('Суммарная стоимость товаров в корзине:', cart.getTotalPrice(), 'синапсов');

  //Проверка метода removeItem
  console.log('В корзине:', cart.getItemsCount(), 'товара на общую сумму:', cart.getTotalPrice(), 'синапсов до удаления одного продукта');
  cart.removeItem(prod2)
  console.log('В корзине:', cart.getItemsCount(), 'товара на общую сумму:', cart.getTotalPrice(), 'синапсов после удаления одного продукта');
}

//Проверка метода clearCart
console.log('В корзине:', cart.getItemsCount(), 'товара на общую сумму:', cart.getTotalPrice(), 'синапсов перед очисткой');
cart.clearCart();
console.log('В корзине:', cart.getItemsCount(), 'товаров на общую сумму:', cart.getTotalPrice(), 'синапсов после очистки');


// ----------Проверка класса BuyerModel----------

const buyer = new BuyerModel();

//Проверка метода update в качестве первоначального получения данных
buyer.update(
  {
    payment: 'card',
    address: 'МСК, Ленинский пр., д. 2',
    email: '',
    phone: '+79998889988'
  }
);

//Проверка метода update и getData
console.log('Покупатель ввёл следующие данные:', buyer.getData());

//Проверка метода validate
console.log('Ошибка при заполнении данных: ', buyer.validate());

//Проверка метода update
buyer.update(
{
    payment: 'cash',
    address: 'ЕКБ, Ленинский пр., д. 2',
    email: 'email@email.email',
    phone: '+70001110011'
  }
);

//Проверка метода update и getData
console.log('Данные покупателя обновлены: ', buyer.getData());

//Проверка метода clear
buyer.clear();
console.log('Данные покупателя удалены: ', buyer.validate());


// ----------Проверка класса CommunicationService----------

const api = new Api(API_URL);

const communication = new CommunicationService(api);

const catalogFromApi = new CatalogModel();

communication.getProducts()
.then((data) => {
  catalogFromApi.setProducts(data.items);
  console.log('Каталог товаров (данные с сервера): ', catalogFromApi.getProducts())
})
.catch((error) => {
  console.error('Ошибка загрузки товаров:',error);
});