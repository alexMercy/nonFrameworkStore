import { getConvertedRoutes, regExpRoutesMatcher } from './router.ts';

export const useParams = () => {
  const convRoutes = getConvertedRoutes();
  if (!convRoutes) return {};
  const { pathname } = window.location;
  let params = {};

  convRoutes.forEach(({ path }) => {
    const param = pathname.match(regExpRoutesMatcher(path))?.groups;
    params = { ...params, ...param };
  });

  return params;
};
