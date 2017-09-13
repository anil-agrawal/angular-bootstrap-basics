import { Logger } from '../../util/logger';
import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
export class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    Logger.trace('CustomReuseStrategy:shouldDetach', route);
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    debugger;
    Logger.trace('CustomReuseStrategy:store', route, handle);
    Logger.trace('route.routeConfig.path : ' + route.routeConfig.path);
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    debugger;
    Logger.trace('CustomReuseStrategy:shouldAttach', route);
    Logger.trace('route.routeConfig.path : ' + route.routeConfig.path);
    const result = !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    /*
      if (result === false) {
        result = !!route.parent && !!route.parent.routeConfig && !!this.handlers[route.parent.routeConfig.path];
      }
    */
    return result;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    debugger;
    Logger.trace('CustomReuseStrategy:retrieve', route);
    Logger.trace('route.routeConfig.path : ' + route.routeConfig.path);
    if (!route.routeConfig) {
      return null;
    }
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    debugger;
    const result = (future.routeConfig === curr.routeConfig);
    Logger.trace('CustomReuseStrategy:shouldReuseRoute', future, curr);
    return result;
  }

}
