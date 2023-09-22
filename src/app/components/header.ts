import {Component} from "../core/abstract.ts";
import {ELEMENT_KEYS, Elements, getElements} from "../../utils/getElements.ts";

export class Header extends Component{
    protected elements: Elements = {};
    protected readonly root: HTMLElement;

    constructor(root: HTMLElement) {
        super();
        this.root = root;
    }

    render(): void {
        this.elements[ELEMENT_KEYS.element] = getElements(this.root, ELEMENT_KEYS.element)
    }

}