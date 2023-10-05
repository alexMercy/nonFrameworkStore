import { Component } from '../../core/abstract.ts';
import { Elements } from '../../../utils/getElements.ts';
import { store } from '../../../store/core';
import { Pizza } from '../../../mock/pizzas.ts';
import styles from './index.module.scss';
import { t } from '../../../translations';

export class Card extends Component {
  protected elements!: Elements;
  private pizza!: Pizza;

  constructor(
    protected readonly root: HTMLElement,
    protected readonly id = root.dataset.pizza!,
  ) {
    super();
    this.pizza = store['pizzas'].find((p: Pizza) => p.id === this.id);
  }
  render(): void {
    this.root.innerHTML = `
    <div class='${styles.container}'>
      <div class='${styles.card}' style='width: 200px; height: 300px;'>
        <div class='${styles.imageContainer}' style='height: 170px;'>
          <img src='${this.pizza.thumb}' alt='preview'>
        </div>
        <div data-meta style='padding: 10px; height: 130px; width: 100%;'>
          ${t(this.pizza.title)}:
          ${this.pizza.priceUSD}$
        </div>
      </div>  
    </div> 
  `;
  }
}
