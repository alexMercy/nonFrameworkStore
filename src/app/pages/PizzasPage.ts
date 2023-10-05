import { Component } from '../core/abstract.ts';
import { ELEMENT_KEYS, Elements, getElements } from '../../utils/getElements.ts';
import { Card } from '../uikit/card';
import { Pizza } from '../../mock/pizzas.ts';
import { store } from '../../store/core';

export class PizzasPage extends Component {
  protected elements: Elements = {};
  protected pizzas: Pizza[] = [];

  constructor(protected readonly root: HTMLElement) {
    super();
    this.fetchPizzas.then(data => {
      this.pizzas = data;
      store['pizzas'] = data;
      this.render();
    });
  }

  fetchPizzas: Promise<Pizza[]> = new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(JSON.parse(localStorage.getItem('pizzas')!)), 500);
    } catch (e) {
      reject(e);
    }
  });

  render(): void {
    this.root.innerHTML = `
    <div style='display: flex; flex-wrap: wrap; gap: 40px;padding: 5%;'>
      ${!this.pizzas.length ? `<div>Loading...</div>` : ''}
      ${this.pizzas.length ? this.pizzas.map(pizza => `<div data-pizza='${pizza.id}'></div>`).join('') : ''}
    </div>
  `;
    if (this.pizzas.length) {
      this.elements[ELEMENT_KEYS.pizza] = getElements(this.root, ELEMENT_KEYS.pizza);
      this.mountingComponents();
      this.addEventListeners();
    }
  }

  mountingComponents() {
    const { pizza: pizzas } = this.elements;
    Object.values(pizzas).forEach(pizza => new Card(pizza).render());
  }

  addEventListeners() {
    const { pizza: pizzas } = this.elements;
    Object.values(pizzas).forEach(pizza => pizza.addEventListener('click', this.onPizzaClick));
  }

  onPizzaClick = ({ currentTarget }: Event) => {
    const base = location.pathname;
    if (!(currentTarget instanceof HTMLElement)) return;
    history.pushState({}, '', `${base}/${currentTarget.dataset.pizza}`);
    dispatchEvent(new Event('popstate'));
  };
}
