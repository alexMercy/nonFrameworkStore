import { Component } from '../../core/abstract.ts';
import { Elements } from '../../../utils/getElements.ts';
import styles from './index.module.scss';

export class Switch extends Component {
  protected elements!: Elements;

  constructor(
    protected readonly root: HTMLElement,
    protected readonly onClick: any,
    protected readonly checked: boolean,
  ) {
    super();
  }
  render(): void {
    this.root.innerHTML = `
    <label class="${styles.switch}">
      <input type="checkbox" ${this.checked ? 'checked' : ''}>
      <span class="${styles.slider} ${styles.round}"></span>
    </label>
  `;
    this.root.querySelector('input')!.addEventListener('click', this.onClick);
  }
}
