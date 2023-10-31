import { Component } from '../core/abstract.ts';
import { ELEMENT_KEYS, Elements, getElements } from '../../utils/getElements.ts';
import { LANGUAGES, t } from '../../translations';
import { Dropdown, Option } from '../uikit/dropdown';
import style from './header.module.scss';
import { store } from '../../store/core';
import { Button } from '../uikit/button';
import { Switch } from '../uikit/switch';

const template = `
  <div class='${style.col}'>
    <button data-button="home"></button>
    <button data-button="pizzas"></button>
  </div>       
  <div></div>
  <div class='${style.right}'>
    <div data-button="theme"></div>
    <div data-component="langPicker"></div>
  </div>        
`;

export class Header extends Component {
  protected elements: Elements = {};
  protected readonly root: HTMLElement;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
  }

  render(): void {
    console.log(store);
    this.root.innerHTML = template;
    this.mountComponents();
    this.addEventListeners();
  }

  mountComponents() {
    this.elements[ELEMENT_KEYS.component] = getElements(this.root, ELEMENT_KEYS.component);
    const { langPicker } = this.elements[ELEMENT_KEYS.component];

    this.elements[ELEMENT_KEYS.button] = getElements(this.root, ELEMENT_KEYS.button);
    const { theme, home, pizzas } = this.elements[ELEMENT_KEYS.button];

    const options: Option[] = Object.keys(LANGUAGES).map(value => ({ label: LANGUAGES[value], value }));

    new Dropdown(langPicker, 'Language', options, this.onLangSelect, style).render();
    new Switch(theme, this.toggleTheme, localStorage.getItem('theme') === 'light').render();
    new Button(home, t('Home')).render();
    new Button(pizzas, t('Pizzas')).render();
  }
  addEventListeners() {
    this.elements[ELEMENT_KEYS.button] = getElements(this.root, ELEMENT_KEYS.button);
    const { home, pizzas } = this.elements[ELEMENT_KEYS.button];
    home.addEventListener('click', this.goToHome);
    pizzas.addEventListener('click', this.goToPizzas);
  }

  goToHome = () => {
    history.pushState({}, '', '/home');
    window.dispatchEvent(new Event('popstate'));
  };

  goToPizzas = () => {
    history.pushState({}, '', '/pizza');
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
