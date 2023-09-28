import { HomePage } from './pages/HomePage.ts';
import { Page2 } from './pages/Page2.ts';
import { IdPage } from './pages/IdPage.ts';

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
    childs: [
      {
        path: '/page2',
        component: (root: HTMLElement) => {
          new Page2(root).render();
        },
      },
    ],
  },
  {
    path: '/home/:id/:id2',
    component: (root: HTMLElement) => {
      new IdPage(root).render();
    },
  },
];
