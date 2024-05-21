import Error404 from '@views/404/404';
import FooterView from '@views/footer/footer';
import HeaderView from '@views/header/header';
import LoginView from '@views/login/login-page';
import MainView from '@views/main/main-page';
import RegistrationView from '@views/registration/registration-page';

class App {
  private headerView: HeaderView;

  private footerView: FooterView;

  private currentView:
    | Error404
    | MainView
    | RegistrationView
    | LoginView
    | null = null;

  constructor() {
    this.headerView = new HeaderView();
    this.footerView = new FooterView();

    window.addEventListener('hashchange', this.route);
    window.addEventListener('load', this.route);
  }

  private addHeader(): void {
    if (window.location.hash !== '#error') {
      this.headerView.initializeHeader();      
      document.body.appendChild(this.headerView.htmlElement);     
    }
  }

 

  private route = (): void => {
    this.addHeader();
    if (!window.location.hash) {
      window.location.hash = '#registration';
      return;
    }
    if (this.currentView) {
      document.body.removeChild(this.currentView.htmlElement);
      this.currentView = null;
    }

    switch (window.location.hash) {
      case '#main':
        this.currentView = new MainView();
        break;
      case '#registration':
        this.currentView = new RegistrationView();
        break;
      case '#login':
        this.currentView = new LoginView();
        break;
      case '#error':
        this.currentView = new Error404();
        document.body.appendChild(this.currentView.htmlElement);
        break;
      default:
        this.currentView = new Error404();
        document.body.appendChild(this.currentView.htmlElement);
    }

    if (this.currentView) {
      document.body.appendChild(this.currentView.htmlElement);
    }
    this.addFooter();
  };

  private addFooter(): void {
    if (window.location.hash !== '#error') {
      this.footerView.initializeFooter();      
      document.body.appendChild(this.footerView.htmlElement);     
    }
  }

  public start(): void {   
    this.route();    
  }
}

export default App;
