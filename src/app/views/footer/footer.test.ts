import FooterView from './footer';

describe('FooterView', () => {
  let footerView: FooterView;

  beforeEach(() => {
    footerView = new FooterView();
    footerView.initializeFooter();
    document.body.appendChild(footerView.htmlElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should properly initialize footer with correct structure', () => {
    const container = footerView.htmlElement.querySelector('.footer-container');
    expect(container).not.toBeNull();

    const itemList = container!.querySelector('.footer-items');
    expect(itemList).not.toBeNull();

    const itemYear = itemList!.querySelector('.footer-item');
    expect(itemYear).not.toBeNull();
    expect(itemYear!.textContent).toBe('2024');

    const itemTeam = itemList!.querySelector('.footer__item');
    expect(itemTeam).not.toBeNull();
    const linkTeam = itemTeam!.querySelector('a');
    expect(linkTeam).not.toBeNull();
    expect(linkTeam!.getAttribute('href')).toBe('#team');
    expect(linkTeam!.textContent).toBe('CodeCraft');

    const itemSchool = itemList!.querySelectorAll('.footer__item')[1];
    expect(itemSchool).not.toBeNull();
    const linkSchool = itemSchool.querySelector('a');
    expect(linkSchool).not.toBeNull();
    expect(linkSchool!.getAttribute('href')).toBe('https://rs.school/');
    expect(linkSchool!.textContent).toBe('RS School');
  });
});
