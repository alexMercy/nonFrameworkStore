import {Component} from "../core/abstract.ts";
import {Elements} from "../../utils/getElements.ts";

export class HomePage extends Component {
    protected elements: Elements = {};
    protected readonly root: HTMLElement;

    constructor(root: HTMLElement) {
        super();
        this.root = root;
    }

    render(): void {
        this.root.innerHTML = `home works!`
    }

}