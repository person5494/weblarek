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

//Проверка метода setSelectedProduct
if (product) catalog.setSelectedProduct(product);

//Проверка метода getSelectedProduct
console.log('Выбранный продукт: ', catalog.getSelectedProduct());


// ----------Проверка класса CartModel----------

const cart = new CartModel();

if (product) {
  
  //Проверка метода addItem
  cart.addItem(product);
  
  //Проверка метода getItems
  console.log('В корзине находятся следующие товары: ', cart.getItems());
  
  //Проверка метода canAddItem
  console.log('Можно ли добавить данный продукт в корзину? "true" - да, "false" - нет: ', cart.canAddItem(product.id));
}

//Проверка метода clearCart
cart.clearCart();
console.log('Корзина после очистки: ', cart.getItems());


// ----------Проверка класса BuyerModel----------

const buyer = new BuyerModel();

//Проверка метода setData
buyer.setData(
  {
    payment: null,
    address: 'МСК, Ленинский пр., д. 2',
    email: null,
    phone: '+79998889988'
  }
)

//Проверка метода getData
console.log('Данные покупателя получены: ', buyer.getData());

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
)
console.log('Данные покупателя обновлены: ', buyer.getData());

//Проверка метода clear
buyer.clear()
console.log('Данные покупателя удалены: ', buyer.getData());


// ----------Проверка класса CommunicationService----------

const api = new Api(API_URL);

const communication = new CommunicationService(api);

const catalogFromApi = new CatalogModel();

communication.getProducts().then((data) => {
  catalogFromApi.setProducts(data.items);
  console.log('Каталог товаров (данные с сервера): ', catalogFromApi.getProducts())
});