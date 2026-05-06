import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { categoryMap } from '../../utils/constants';
import { setCategoryStyle } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { ICardBase, TCardFullActions, ICardFull, TCardBasketActions, ICardBasket, TCardCatalogActions, ICardCatalog } from '../../types';

// Общий класс
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
    this.cardPrice.textContent =
      value === null ? `Бесценно` : `${value} синапсов`;
  }
}

//Класс для представления полной карточки товара, которая открывается в модальном окне
export class CardFull extends CardBase<ICardFull> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardDescription: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: TCardFullActions) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      '.card__category',
      this.container,
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      '.card__image',
      this.container,
    );
    this.cardDescription = ensureElement<HTMLElement>(
      '.card__text',
      this.container,
    );
    this.cardButton = ensureElement<HTMLButtonElement>(
      '.card__button',
      this.container,
    );

    this.cardButton.addEventListener('click', actions.onButtonClick);
  }

  set category(value: string) {
    setCategoryStyle(this.cardCategory, value, categoryMap);
  }

  set description(value: string) {
    this.cardDescription.textContent = value;
  }

  set image(value: string) {
    const imagePath = value.replace('.svg', '.png');
    this.cardImage.src = `${CDN_URL}${imagePath}`;
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }

  set buttonDisable(value: boolean) {
    this.cardButton.disabled = value;
  }
}

//Класс для представления карточки товара в корзине
export class CardBasket extends CardBase<ICardBasket> {
  protected cardIndex: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: TCardBasketActions) {
    super(container);

    this.cardIndex = ensureElement<HTMLElement>(
      '.basket__item-index',
      this.container,
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      '.basket__item-delete',
      this.container,
    );

    this.deleteButton.addEventListener('click', actions.onDelete);
  }

  set index(value: number) {
    this.cardIndex.textContent = String(value);
  }
}

//Класс для представления карточки товара в каталоге на главной странице
export class CardCatalog extends CardBase<ICardCatalog> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, actions: TCardCatalogActions) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      '.card__category',
      this.container,
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      '.card__image',
      this.container,
    );

    this.container.addEventListener('click', actions.onSelect);
  }

  set category(value: string) {
    setCategoryStyle(this.cardCategory, value, categoryMap);
  }

  set image(value: string) {
    const imagePath = value.replace('.svg', '.png');
    this.cardImage.src = `${CDN_URL}${imagePath}`;
  }
}
