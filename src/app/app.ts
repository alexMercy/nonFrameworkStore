import {ELEMENT_KEYS, Elements, getElements} from "../utils/getElements.ts";
import {Component} from "./core/abstract.ts";
import {t} from "../lang";
import {Header} from "./components/header.ts";
import {routes} from "./routes.ts";

const template = `
    <section data-layout="header">
        <button data-button="theme">${t('Toggle theme')}</button>
          <button data-button="lang">${t('Toggle language')}</button>
          <button data-button="home">${t('Home')}</button>
          <button data-button="page2">${t('Page 2')}</button>
          <button data-button="back">${t('Back')}</button>
    </section>
    <section data-layout="content"></section>
`


export class App extends Component {

    protected elements: Elements = {};
    protected readonly root: HTMLElement;

    constructor(root: HTMLElement) {
        super();
        this.root = root;
    }

    render() {
        this.root.innerHTML = template;
        this.elements[ELEMENT_KEYS.layout] = getElements(this.root, ELEMENT_KEYS.layout);
        this.elements[ELEMENT_KEYS.button] = getElements(this.root, ELEMENT_KEYS.button);
        this.mountComponents();
        this.addEventListeners();
        this.onPopState()
    }


    mountComponents() {
        const {header} = this.elements[ELEMENT_KEYS.layout];
        new Header(header);
    }

    addEventListeners() {
        const {theme, lang, home, page2, back} = this.elements[ELEMENT_KEYS.button];
        theme.addEventListener('click', this.toggleTheme);
        lang.addEventListener('click', this.toggleLang)
        home.addEventListener('click', this.goToHome)
        back.addEventListener('click', this.goBack)
        page2.addEventListener('click', this.goToEmpty)
        window.addEventListener('popstate', this.onPopState)
    }


    goToHome = () => {
        history.pushState({}, '', '/home');
        window.dispatchEvent(new Event('popstate'));
    }
    goToEmpty = () => {
        history.pushState({}, '', '/page2');
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

    onPopState = () => {
        const path = window.location.pathname;
        console.log(path)
        const {content} = this.elements[ELEMENT_KEYS.layout];
        const route = routes.find(route => route.path === path);
        route
            ? route.component(content)
            : console.error('Unknown route');
    }
}