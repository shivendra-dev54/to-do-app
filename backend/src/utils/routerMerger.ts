type Router = Record<string, any>;

export function mergeRoutes(...routers: Router[]): Router {
  const merged: Router = {};

  for (const router of routers) {
    for (const path in router) {
      if (merged[path]) {
        throw new Error(`Duplicate route detected: ${path}`);
      }
      merged[path] = router[path];
    }
  }

  return merged;
};