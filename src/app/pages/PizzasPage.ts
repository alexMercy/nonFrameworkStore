import { Component } from '../core/abstract.ts';
import { Elements } from '../../utils/getElements.ts';

export class PizzasPage extends Component {
  protected elements!: Elements;
  protected pizzas: any = [];

  constructor(protected readonly root: HTMLElement) {
    super();
    this.fetchPizzas.then(data => {
      this.pizzas = data;
      this.render();
    });
  }

  fetchPizzas = new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(JSON.parse(localStorage.getItem('pizzas')!)), 500);
    } catch (e) {
      reject(e);
    }
  });

  render(): void {
    this.root.innerHTML = `
    <div>
      ${!this.pizzas.length ? `<div>Loading...</div>` : ''}
      ${this.pizzas.length ? this.pizzas.map(pizza => `<div>${pizza.title}</div>`).join('') : ''}
    </div>
  `;
  }
}
