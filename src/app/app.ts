import isPageAccessable from '@utils/access-control';
import {
  Error404,
  MainPageView,
  LoginView,
  ProfileView,
  RegistrationView,
  CatalogPageView,
  HeaderView,
  MainView,
  FooterView,
  ProductPageView,
  BasketPageView,
} from '@views/index';

type Page =
  | Error404
  | MainPageView
  | RegistrationView
  | LoginView
  | ProfileView
  | CatalogPageView;

class App {
  private headerView: HeaderView;

  private mainView!: MainView;

  private footerView: FooterView;

  private currentPage: Page | null = null;

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
    const hashParts = window.location.hash.slice(1).split('/');
    const route = hashParts[0];
    const productId = hashParts[1];
    const cartId = 'f96019a2-085b-4763-abfd-86404d2524dc';

    if (!route) {
      window.location.hash = '#main';
      return;
    }

    if (this.currentPage) {
      document.body.removeChild(this.currentPage.htmlElement);
      this.currentPage = null;
    }

    if (route === 'product' && productId) {
      this.hideFooterHeader = false;
      this.mainView.page = new ProductPageView(productId);
    } else {
      switch (window.location.hash) {
        case '#main':
          this.hideFooterHeader = false;
          this.mainView.page = new MainPageView();
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
        case '#profile':
          if (isPageAccessable('authorized')) {
            this.hideFooterHeader = false;
            this.mainView.page = new ProfileView();
          }
          break;
        case '#catalog':
          this.hideFooterHeader = false;
          this.mainView.page = new CatalogPageView();
          break;

        case '#cart':
          this.hideFooterHeader = false;
          this.mainView.page = new BasketPageView(cartId);
          break;

        case '#error':
          this.hideFooterHeader = true;
          this.mainView.page = new Error404();
          break;
        default:
          this.hideFooterHeader = true;
          this.mainView.page = new Error404();
      }
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
