import { Component } from '../core/abstract.ts';
import {
  ELEMENT_KEYS,
  Elements,
  getElements,
} from '../../utils/getElements.ts';
import { LANGUAGES, t } from '../../lang';
import styles from './header.module.scss';

const template = `
          <button data-button="theme">${t('Toggle theme')}</button>
          <button data-button="home">${t('Home')}</button>
          <button data-button="page2">${t('Page 2')}</button>
          <button data-button="back">${t('Back')}</button>
          <div data-button="langPicker"  class="${styles.container}">
            <div class="${styles.lpb}">${t('Language',)}</div>
            <ul data-select="lang" class="${styles.lp}">
                ${Object.keys(LANGUAGES).map(lang => `<li data-lang="${lang}">${t(LANGUAGES[lang])}</li>`).join('')}
            </ul>
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
    this.root.innerHTML = template;
    this.addEventListeners();
  }

  addEventListeners() {
    this.elements[ELEMENT_KEYS.button] = getElements(this.root, ELEMENT_KEYS.button);
    this.elements[ELEMENT_KEYS.select] = getElements(this.root, ELEMENT_KEYS.select);
    const {
      theme,
      home,
      page2,
      back,
      langPicker } = this.elements[ELEMENT_KEYS.button];
    const {lang: select} = this.elements[ELEMENT_KEYS.select]
    theme.addEventListener('click', this.toggleTheme);
    home.addEventListener('click', this.goToHome);
    back.addEventListener('click', this.goBack);
    page2.addEventListener('click', this.goToPage2);
    select.addEventListener('click',this.onLangSelect)
    langPicker.addEventListener('mouseover', this.onLangPickerHover);
    langPicker.addEventListener('mouseout', this.onLangPickerHover);
  }

  goToHome = () => {
    history.pushState({}, '', '/home');
    window.dispatchEvent(new Event('popstate'));
  };
  goToPage2 = () => {
    history.pushState({}, '', '/home/page2');
    window.dispatchEvent(new Event('popstate'));
  };
  goBack = () => {
    history.back();
  };
  toggleTheme = () => {
    document.body.classList.toggle('dark_mode');
    localStorage.getItem('theme') === 'dark'
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark');
  };
  toggleLang = () => {
    const lang = localStorage.getItem('lang')!;
    localStorage.setItem('lang', lang === 'en' ? 'ru' : 'en');
    location.reload();
  };

  onLangSelect = (e: Event) => {
    console.log(e.target);
    if (!e.target || !(e.target instanceof HTMLElement)) return;
    localStorage.setItem('lang', e.target.dataset.lang!);
    location.reload();
  }

  onLangPickerHover = () => {
    this.elements[ELEMENT_KEYS.select] = getElements(this.root, ELEMENT_KEYS.select);
    const {lang} = this.elements[ELEMENT_KEYS.select];
    lang.classList.toggle(styles.expand);
  };
}
