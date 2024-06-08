class Router {
  static navigateTo(route: string): void {
    window.location.hash = route;
  }
}
export default Router;
