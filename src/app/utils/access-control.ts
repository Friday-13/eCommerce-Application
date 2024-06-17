import { getCustomerToken } from '@models/customer';
import Router from './router';

type TAuthorizedGroup = 'authorized' | 'none-authorized' | 'both';

export default function isPageAccessable(
  group: TAuthorizedGroup,
  redirectTo = '#main'
): boolean {
  if (group === 'both') return true;
  const isAuthorized = Boolean(getCustomerToken());
  if (group === 'authorized' && isAuthorized) return true;
  if (group === 'none-authorized' && !isAuthorized) return true;

  Router.navigateTo(redirectTo);
  return false;
}
