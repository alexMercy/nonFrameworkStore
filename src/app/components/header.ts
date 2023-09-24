import { Component } from '../core/abstract.ts';
import { ELEMENT_KEYS, Elements, getElements } from '../../utils/getElements.ts';
import { LANGUAGES, t } from '../../lang';
import { Dropdown, Option } from '../uikit/dropdown';
import style from './header.module.scss';

const template = `
          <button data-button="theme">${t('Toggle theme')}</button>
          <button data-button="home">${t('Home')}</button>
          <button data-button="page2">${t('Page 2')}</button>
          <div data-component="langPicker"></div>
          
`;

export class Header extends Component {
  protected elements: Elements = {};
  protected readonly root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = template;
    this.mountComponents();
    this.addEventListeners();
  }

  mountComponents() {
    this.elements[ELEMENT_KEYS.component] = getElements(this.root, ELEMENT_KEYS.component);
    const { langPicker } = this.elements[ELEMENT_KEYS.component];
    const options: Option[] = Object.keys(LANGUAGES).map(value => ({ label: LANGUAGES[value], value }));

    new Dropdown(langPicker, 'Language', options, this.onLangSelect, style).render();
  }
  addEventListeners() {
    this.elements[ELEMENT_KEYS.button] = getElements(this.root, ELEMENT_KEYS.button);
    this.elements[ELEMENT_KEYS.select] = getElements(this.root, ELEMENT_KEYS.select);
    const { theme, home, page2 } = this.elements[ELEMENT_KEYS.button];
    theme.addEventListener('click', this.toggleTheme);
    home.addEventListener('click', this.goToHome);
    page2.addEventListener('click', this.goToPage2);
  }

  goToHome = () => {
    history.pushState({}, '', '/home');
    window.dispatchEvent(new Event('popstate'));
  };
  goToPage2 = () => {
    history.pushState({}, '', '/home/page2');
    window.dispatchEvent(new Event('popstate'));
  };
  toggleTheme = () => {
    document.body.classList.toggle('dark_mode');
    localStorage.getItem('theme') === 'dark'
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark');
  };

  onLangSelect = (op: Option) => {
    localStorage.setItem('lang', op.value);
    location.reload();
  };
}
