import isPageAccessable from '@utils/access-control';
import Error404 from '@views/404/404';
import FooterView from '@views/footer/footer';
import HeaderView from '@views/header/header';
import LoginView from '@views/login/login-page';
import MainView from '@views/main-view';
import MainPageView from '@views/main/main-page';
import ProductPageView from '@views/product/product-page';
import RegistrationView from '@views/registration/registration-page';

class App {
  private headerView: HeaderView;

  private mainView: MainView;

  private footerView: FooterView;

  private currentPage:
    | Error404
    | MainPageView
    | RegistrationView
    | LoginView
    | null = null;

  constructor() {
    this.headerView = new HeaderView();
    this.mainView = new MainView();
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

  private addMain(): void {
    this.mainView = new MainView();
    document.body.appendChild(this.mainView.htmlElement);
  }

  private addFooter(): void {
    if (window.location.hash !== '#error') {
      this.footerView.initializeFooter();
      document.body.appendChild(this.footerView.htmlElement);
    }
  }

  private route = (): void => {
    if (!window.location.hash) {
      window.location.hash = '#main';
      return;
    }
    if (this.currentPage) {
      document.body.removeChild(this.currentPage.htmlElement);
      this.currentPage = null;
    }

    switch (window.location.hash) {
      case '#main':
        this.hideFooterHeader = false;
        // this.mainView.page = new MainPageView();
        this.mainView.page = new ProductPageView();
        break;
      case '#registration':
        if (isPageAccessable('none-authorized')) {
          this.hideFooterHeader = false;
          this.mainView.page = new RegistrationView();
        }
        break;
      case '#login':
        if (isPageAccessable('none-authorized')) {
          this.hideFooterHeader = false;
          this.mainView.page = new LoginView();
        }
        break;
      case '#error':
        this.hideFooterHeader = true;
        this.mainView.page = new Error404();
        break;
      default:
        this.hideFooterHeader = true;
        this.mainView.page = new Error404();
    }
    this.headerView.updateMenu();
  };

  public start(): void {
    this.addHeader();
    this.addMain();
    this.addFooter();
  }

  set hideFooterHeader(state: boolean) {
    if (state) {
      this.headerView.htmlElement.classList.add('hidden');
      this.footerView.htmlElement.classList.add('hidden');
    } else {
      this.headerView.htmlElement.classList.remove('hidden');
      this.footerView.htmlElement.classList.remove('hidden');
    }
  }
}

export default App;
