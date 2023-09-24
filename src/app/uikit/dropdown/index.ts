import { Component } from '../../core/abstract.ts';
import { ELEMENT_KEYS, Elements, getElements } from '../../../utils/getElements.ts';
import { t } from '../../../lang';
import defStyles from './index.module.scss';

export type Option = {
  label: string;
  value: string;
};

export type Styles = {
  container?: string;
  button?: string;
  items?: string;
  expand?: string;
  buttonHover?: string;
};
export class Dropdown extends Component {
  protected readonly template: string;
  protected elements: Elements = {};

  constructor(
    public readonly root: HTMLElement,
    public readonly title: string,
    public readonly options: Option[],
    public readonly onChange: (op: Option) => void,
    public readonly styles?: Styles,
  ) {
    super();
    this.template = `
          <div data-element="dropdown"  class="${defStyles.container} ${this.styles?.container || ' '}">
            <div data-element="button" class="${defStyles.button} ${this.styles?.button || ' '}">${t(title)}</div>
            
            <ul data-element="ops" class="${defStyles.items} ${this.styles?.items || ' '}">
                ${options.map(({ label, value }) => `<li data-item="${value}">${t(label)}</li>`).join('')}
            </ul>
          </div>`;
  }

  render(): void {
    this.root.innerHTML = this.template;
    this.elements[ELEMENT_KEYS.element] = getElements(this.root, ELEMENT_KEYS.element);
    this.addEventListeners();
  }

  addEventListeners() {
    const { dropdown, ops } = this.elements[ELEMENT_KEYS.element];

    dropdown.addEventListener('mouseover', this.onHover);
    dropdown.addEventListener('mouseout', this.onHover);
    ops.addEventListener('click', this.onClick);
  }

  onHover = () => {
    const { ops, button } = this.elements[ELEMENT_KEYS.element];
    button.classList.toggle(defStyles.buttonHover);
    this.styles?.buttonHover && button.classList.toggle(this.styles.buttonHover);
    ops.classList.toggle(defStyles.expand);
    this.styles?.expand && ops.classList.toggle(this.styles.expand);
  };

  onClick = (e: Event): void => {
    const { target: t } = e;
    if (!t || !(t instanceof HTMLElement) || !t.dataset.item) throw new Error('Dropdown: Invalid target');
    else this.onChange(this.options.find(op => op.value === t.dataset.item)!);
  };
}
