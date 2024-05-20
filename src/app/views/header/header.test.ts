import HeaderView from "./header";

describe('HeaderView', () => {
  let headerView: HeaderView;

  beforeEach(() => {    
    headerView = new HeaderView();    
    headerView.initializeHeader();    
    document.body.appendChild(headerView.htmlElement);
  });
  afterEach(() => {   
    document.body.innerHTML = '';
  });

  test('should properly initialize header with menu items', () => {    
    const navElement = headerView.htmlElement.querySelector('nav');
    if (navElement) {
      const menuItems = navElement.querySelectorAll('li');
      expect(menuItems.length).toBe(3); 
      expect(menuItems[0].textContent).toContain('Sign in');
      expect(menuItems[1].textContent).toContain('Sign up');
      expect(menuItems[2].textContent).toContain('Sign out');
    } else {
      throw new Error('Navigation element is not found');
    }
  });
});
