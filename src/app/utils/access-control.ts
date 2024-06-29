import Router from './router';
import CookieManager from './cookie';

type TAuthorizedGroup = 'authorized' | 'none-authorized' | 'both';

export default function isPageAccessable(
  group: TAuthorizedGroup,
  redirectTo = '#main'
): boolean {
  if (group === 'both') return true;
  const isAuthorized = CookieManager.isCustomerAuthorized();
  if (group === 'authorized' && isAuthorized) return true;
  if (group === 'none-authorized' && !isAuthorized) return true;

  Router.navigateTo(redirectTo);
  return false;
}
