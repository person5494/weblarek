import './scss/styles.scss';
import { CatalogModel } from './components/models/CatalogModel';
import { CartModel } from './components/models/CartModel';
import { BuyerModel } from './components/models/BuyerModel';
import { apiProducts } from './utils/data';
import { CommunicationService } from './components/services/CommunicationService';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate } from './utils/utils';
import { CardCatalog } from './components/view/Card';
import { Header } from './components/view/Header';
import { Gallery } from './components/view/Gallery';


const events = new EventEmitter()

const catalog = new CatalogModel(events);

catalog.setProducts(apiProducts.items);

const api = new Api(API_URL);

const communication = new CommunicationService(api);

const catalogFromApi = new CatalogModel(events);

