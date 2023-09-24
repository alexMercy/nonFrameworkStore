import {ELEMENT_KEYS, Elements, getElements} from "../utils/getElements.ts";
import {Component} from "./core/abstract.ts";
import {Header} from "./components/header.ts";
import {Route, routes} from "./routes.ts";

const template = `
    <section data-layout="header"></section>
    <section data-outlet></section>
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
        this.mountComponents();
        this.addEventListeners();
        window.dispatchEvent(new Event('popstate'));
    }


    mountComponents() {
        const {header} = this.elements[ELEMENT_KEYS.layout];
        new Header(header).render();
    }

    addEventListeners() {
        window.addEventListener('popstate', this.onPopState)
    }

    onPopState = () => {
        const path = window.location.pathname;

        const convertedRoutes = getConvertedRoutes();
        const outlet: HTMLElement = this.root.querySelector('[data-outlet]')!;

        const route = convertedRoutes.find(route => {
            const re =
            `^${(route.path)
                .replace(/(\/?)\*/g, "($1.*)?")
                .replace(/\/$/, "")
                .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/$3]+)$2$3")
                .replace(/\.\(/g, "\\.(")}/*$`

            return path.match(new RegExp(re))
        })

        const rec = (route: any, outlet: HTMLElement): HTMLElement => {
            const childOutlet = route.parent ? rec(route.parent, outlet) as HTMLElement : outlet;
            route.component(childOutlet);
            return outlet.querySelector('[data-outlet]')!
        }

        route ? rec(route,outlet) : console.error("Route Undefined")

    }
}

export const getConvertedRoutes = () => {
    const rec = (routes: Route[], baseURL='', parent?: Route) => {
        const res:{path: string, component: (root: HTMLElement)=> void, parent: any}[] = [];

        routes.forEach(route => {
            const {path, component, childs} = route;
            res.push({path:`${baseURL}${path}`,component, parent});
            childs && res.push(...rec(childs,path,  route))
        })

        return res;
    }
    const convertedRoutes = rec(routes);
    const convPaths = convertedRoutes.map(({path}) => path);
    return convPaths.length === new Set(convPaths).size
        ? convertedRoutes
        : console.error("Duplicate Routes");

}