import { Component } from '../../core/abstract.ts';
import { Elements } from '../../../utils/getElements.ts';

export class Card extends Component {
  protected elements!: Elements;

  private template = `
    <div>
      AMA Card
    </div>
  `;

  constructor(
    protected readonly root: HTMLElement,
    protected readonly id: string,
  ) {
    super();
  }
  render(): void {
    this.root.innerHTML = this.template;
    console.log(this.id);
  }
}
