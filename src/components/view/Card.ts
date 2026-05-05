import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";


// Общие интерфейс и класс
export interface ICardBase {
  title: string;
  price: number | null;
}

export abstract class CardBase<T> extends Component<T & ICardBase> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.cardTitle.textContent = value;
  }

  set price(value: number | null) {
    this.cardPrice.textContent = value === null ? `Бесценно` : `${value} синапсов`
  }
}

//Интерфейс и класс для представления полной карточки товара, которая открывается в модальном окне

export type CardFullActions = {
  onAddToBasket: () => void;
}

export interface ICardFull extends ICardBase {
  category: string;
  description: string;
  image: string;
}

function setCategoryStyle(element: HTMLElement, value: string): void {
  element.textContent = value;
  element.className = 'card__category';
  const categoryClass = categoryMap[value as keyof typeof categoryMap];

  if (categoryClass) {
    element.classList.add(categoryClass);
  }
}

export class CardFull extends CardBase<ICardFull> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardDescription: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: CardFullActions) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardButton.addEventListener('click', actions.onAddToBasket);
  }

  set category(value: string) {
    setCategoryStyle(this.cardCategory, value);
  }

  set description(value: string) {
    this.cardDescription.textContent = value;
  }

  set image(value: string) {
    this.cardImage.src = value;
  }
}


//Интерфейс и класс для представления карточки товара в корзине

export type CardBasketActions = {
  onDelete: () => void;
}

export interface ICardBasket extends ICardBase {
  id: string;
  index: number;
}

export class CardBasket extends CardBase<ICardBasket> {
  protected cardIndex: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents, actions: CardBasketActions) {
    super(container);

    this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    this.deleteButton.addEventListener('click', actions.onDelete);
  }

  set index(value: number) {
    this.cardIndex.textContent = String(value);
  }
}

//Интерфейс и класс для представления карточки товара в каталоге на главной странице

export type CardCatalogActions = {
  onSelect: () => void;
}

export interface ICardCatalog extends ICardBase {
  category: string;
  image: string;
}

export class CardCatalog extends CardBase<ICardBase> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, actions: CardCatalogActions) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);

    this.container.addEventListener('click', actions.onSelect);
  }

  set category(value: string) {
    setCategoryStyle(this.cardCategory, value);
  }

  set image(value: string) {
    this.cardImage.src = value;
  }
}