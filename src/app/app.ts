import { ELEMENT_KEYS, Elements, getElements } from '../utils/getElements.ts';
import { Component } from './core/abstract.ts';
import { Header } from './components/header.ts';
import { Router } from './core/router.ts';

const template = `
    <section data-layout="header"></section>
    <section data-outlet></section>
`;

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
    this.mountComponents();
    Router.initInstance(this.root);
  }

  mountComponents() {
    const { header } = this.elements[ELEMENT_KEYS.layout];
    new Header(header).render();
  }
}
