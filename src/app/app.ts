import Error404 from '@views/404/404';
import LoginView from '@views/login/login-page';
import MainView from '@views/main/main-page';
import RegistrationPageView from '@views/registration/registration-page';

class App {
  private currentView:
    | Error404
    | MainView
    | RegistrationPageView
    | LoginView
    | null = null;

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
      case '#registration':
        this.currentView = new RegistrationPageView();
        document.body.appendChild(this.currentView.htmlElement);
        break;
      case '#login':
        this.currentView = new LoginView();
        document.body.appendChild(this.currentView.htmlElement);
        break;
      case '#error':
        this.currentView = new Error404();
        document.body.appendChild(this.currentView.htmlElement);
        break;
      default:
        this.currentView = new Error404();
        document.body.appendChild(this.currentView.htmlElement);
    }
  };

  public start(): void {
    this.route();
  }
}

export default App;
