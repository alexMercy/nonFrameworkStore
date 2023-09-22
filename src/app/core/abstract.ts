import {Elements} from "../../utils/getElements.ts";

export abstract class Component {
    protected abstract readonly root: HTMLElement;
    protected abstract elements: Elements
    constructor() {}

    abstract render(): void;
}