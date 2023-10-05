import { Component } from '../../core/abstract.ts';
import { Elements } from '../../../utils/getElements.ts';
import { useParams } from '../../core/useParams.ts';

export class PizzaPage extends Component {
  protected elements!: Elements;
  params = useParams();

  constructor(protected readonly root: HTMLElement) {
    super();
  }

  render(): void {
    this.root.innerHTML = `
    <div style='display: flex;justify-content:center;align-items:center; height: 100%;'>
      Pizza page works! ${JSON.stringify(this.params)}
    </div>
    `;
  }
}
