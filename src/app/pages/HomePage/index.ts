import { Component } from '../../core/abstract.ts';
import { Elements, getElements } from '../../../utils/getElements.ts';
import { t } from '../../../lang';
import { Tile } from '../../uikit/tile';
import { createEntity, store } from '../../../store/core';
import s from './index.module.scss';

const menu: { label: string; url: string; id: string }[] = [
  { label: t('Pizza'), url: '/pizza', id: 'pizza' },
  { label: t('Sushi'), url: '/sushi', id: 'sushi' },
];

export class HomePage extends Component {
  protected elements: Elements = {};
  protected readonly root: HTMLElement;

  private template = `
    <div class='${s.container}'>
      ${menu.map(({ id }) => `<div data-op='${id}'></div>`).join('')}
    </div>
    `;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = this.template;
    this.elements['op'] = getElements(this.root, 'op');
    store['tileMenu'] = createEntity(menu);
    this.addListeners();
    this.mountComponents();
  }

  addListeners() {
    const ops = this.elements['op'];
    Object.values(ops).forEach(op => {
      op.addEventListener('click', this.onClick);
    });
  }

  mountComponents() {
    const ops = this.elements['op'];
    Object.values(ops).forEach(op => {
      new Tile(op, 'op').render();
    });
  }

  onClick = ({ currentTarget }: Event) => {
    if (!(currentTarget instanceof HTMLElement)) return;
    history.pushState({}, '', currentTarget.dataset.op);
    dispatchEvent(new Event('popstate'));
  };
}
