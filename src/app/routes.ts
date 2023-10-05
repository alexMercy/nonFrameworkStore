import { HomePage } from './pages/HomePage';
import { PizzasPage } from './pages/PizzasPage.ts';
import { PizzaPage } from './pages/PizzaPage';

export type Route = {
  path: string;
  component?: (root: HTMLElement) => void;
  redirectTo?: string;
  childs?: Route[];
};

export const routes: Route[] = [
  {
    path: '/',
    redirectTo: '/home',
  },
  {
    path: '/home',
    component: root => {
      new HomePage(root).render();
    },
  },
  {
    path: '/pizza',
    component: (root: HTMLElement) => {
      new PizzasPage(root).render();
    },
  },
  {
    path: '/pizza/:id',
    component: root => {
      new PizzaPage(root).render();
    },
  },
  {
    path: '/sushi',
    component: (root: HTMLElement) => {
      new PizzasPage(root).render();
    },
  },
];
