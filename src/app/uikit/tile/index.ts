import { Component } from '../../core/abstract.ts';
import { Elements } from '../../../utils/getElements.ts';
import { store } from '../../../store/core';
import s from './index.module.scss';

export class Tile extends Component {
  protected elements!: Elements;

  constructor(
    protected readonly root: HTMLElement,
    protected readonly dataAttr: string,
  ) {
    super();
  }

  render(): void {
    const id = this.root.dataset[this.dataAttr];
    const { tileMenu } = store;
    if (!id) throw new Error('No id');

    const { label } = tileMenu.ids.includes(id) && tileMenu.entity[id];

    this.root.innerHTML = `
    <div class='${s.container}'>${label}</div>
    `;
  }
}
