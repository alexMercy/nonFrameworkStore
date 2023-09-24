import {Component} from "../core/abstract.ts";
import {Elements} from "../../utils/getElements.ts";
import {useParams} from "../../utils/useParams.ts";

export class IdPage extends Component {
    protected elements!: Elements;
    protected readonly root: HTMLElement;
    params = useParams();
    constructor(root: HTMLElement) {
        super();
        this.root = root;
    }

    render(): void {
        console.log(this.params);
    }

}