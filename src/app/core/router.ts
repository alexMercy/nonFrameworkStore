import { Route, routes } from '../routes.ts';

export const regExpRoutesMatcher = (path: string) =>
  new RegExp(
    `^${path
      .replace(/(\/?)\*/g, '($1.*)?')
      .replace(/\/$/, '')
      .replace(/:(\w+)(\?)?(\.)?/g, '$2(?<$1>[^/$3]+)$2$3')
      .replace(/\.\(/g, '\\.(')}/*$`,
  );

export const getConvertedRoutes = () => {
  const rec = (routes: Route[], baseURL = '', parent?: Route) => {
    const res: { path: string; component: (root: HTMLElement) => void; parent: any }[] = [];

    routes.forEach(route => {
      const { path, component, childs, redirectTo } = route;
      const r: any = { path: `${baseURL}${path}` };

      component && (r.component = component);
      redirectTo && (r.redirectTo = redirectTo);
      parent && (r.parent = parent);

      res.push(r);
      childs && res.push(...rec(childs, path, route));
    });

    return res;
  };
  const convertedRoutes = rec(routes);
  const convPaths = convertedRoutes.map(({ path }) => path);

  if (convPaths.length === new Set(convPaths).size) return convertedRoutes;
  else throw new Error('Duplicate routes exist');
};

export class Router {
  private static instance: Router;
  private constructor(public root: HTMLElement) {}

  static initInstance(root: HTMLElement) {
    if (!Router.instance) {
      Router.instance = new Router(root);
      this.init();
    }
  }

  static getInstance() {
    return Router.instance;
  }

  private static init() {
    window.addEventListener('popstate', this.onPopState);
    window.dispatchEvent(new Event('popstate'));
  }

  private static onPopState = () => {
    const { pathname } = window.location;

    const convertedRoutes = getConvertedRoutes();
    if (!convertedRoutes) return;

    const outlet: HTMLElement = Router.instance.root.querySelector('[data-outlet]')!;
    const route = convertedRoutes.find(({ path }) => pathname.match(regExpRoutesMatcher(path)));

    //TODO: Update router
    const rec = (route: any, outlet: HTMLElement): HTMLElement => {
      const childOutlet = route.parent ? (rec(route.parent, outlet) as HTMLElement) : outlet;

      if (route.redirectTo && !route.parent) {
        const redirectRoute = routes.find(r => r.path === route.redirectTo);
        if (redirectRoute) {
          // @ts-ignore
          redirectRoute.component(childOutlet);
          history.pushState({}, '', redirectRoute.path);
        }
      } else route.component(childOutlet);

      return outlet.querySelector('[data-outlet]')!;
    };
    if (route) rec(route, outlet);
    else throw new Error('Route Undefined');
  };
}
