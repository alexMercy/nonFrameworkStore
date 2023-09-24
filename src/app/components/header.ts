import {Component} from "../core/abstract.ts";
import {ELEMENT_KEYS, Elements, getElements} from "../../utils/getElements.ts";
import {t} from "../../lang";

const template = `
          <button data-button="theme">${t('Toggle theme')}</button>
          <button data-button="lang">${t('Toggle language')}</button>
          <button data-button="home">${t('Home')}</button>
          <button data-button="page2">${t('Page 2')}</button>
          <button data-button="back">${t('Back')}</button>
`

export class Header extends Component{
    protected elements: Elements = {};
    protected readonly root: HTMLElement;

    constructor(root: HTMLElement) {
        super();
        this.root = root;
    }

    render(): void {
        this.root.innerHTML = template;
        this.elements[ELEMENT_KEYS.button] = getElements(this.root, ELEMENT_KEYS.button)
        this.addEventListeners()
    }

    addEventListeners() {
        const {theme, lang, home, page2, back} = this.elements[ELEMENT_KEYS.button];
        theme.addEventListener('click', this.toggleTheme);
        lang.addEventListener('click', this.toggleLang)
        home.addEventListener('click', this.goToHome)
        back.addEventListener('click', this.goBack)
        page2.addEventListener('click', this.goToPage2)
    }

    goToHome = () => {
        history.pushState({}, '', '/home');
        window.dispatchEvent(new Event('popstate'));
    }
    goToPage2 = () => {
        history.pushState({}, '', '/home/page2');
        window.dispatchEvent(new Event('popstate'));
    }
    goBack = () => {
        history.back();
    }
    toggleTheme = () => {
        document.body.classList.toggle('dark_mode');
        localStorage.getItem('theme') === 'dark'
            ? localStorage.setItem('theme', 'light')
            : localStorage.setItem('theme', 'dark')
    }
    toggleLang = () => {
        const lang = localStorage.getItem('lang')!;
        localStorage.setItem('lang', lang === 'en' ? 'ru' : 'en');
        location.reload();
    }


}