import {HomePage} from "./pages/HomePage.ts";
import {Page2} from "./pages/Page2.ts";

export type Route = {
    path: string,
    component: (root: HTMLElement) => void
}

export const routes: Route[] = [
    {
        path: '/home',
        component: (root: HTMLElement) => {
            new HomePage(root).render()
        }
    },
    {
        path: '/page2',
        component: (root: HTMLElement) => {
            new Page2(root).render()
        }
    }
]