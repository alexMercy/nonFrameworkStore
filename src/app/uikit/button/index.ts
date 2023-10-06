import { Component } from '../../core/abstract.ts';
import { Elements } from '../../../utils/getElements.ts';
import styles from './index.module.scss';

export class Button extends Component {
  protected elements!: Elements;

  constructor(
    protected readonly root: HTMLElement,
    protected readonly text: string,
  ) {
    super();
  }

  render(): void {
    this.root.classList.add(styles.root);
    this.root.innerHTML = this.text;
  }
}
