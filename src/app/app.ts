import Error404 from '@views/404/404';
import MainView from '@views/main/main-page';

class App {
  private currentView: Error404 | MainView | null = null;

  constructor() {
    window.addEventListener('hashchange', this.route);
    window.addEventListener('load', this.route);
  }

  private route = (): void => {
    if (!window.location.hash) {
      window.location.hash = '#main';
      return;
    }
    if (this.currentView) {
      this.currentView.clearContent();
    }

    switch (window.location.hash) {
      case '#main':
        this.currentView = new MainView();
        break;
      case '#error':
        this.currentView = new Error404();
        document.body.appendChild(this.currentView.htmlElement);
        break;
      default:
        // this.currentView = new MainView();
        break;
    }
  };

  public start(): void {
    this.route();
  }
}

export default App;
