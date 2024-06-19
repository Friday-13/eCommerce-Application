import { DiscountCode } from '@commercetools/platform-sdk';
import apiRoot from './api-root';

export default function getActivePromocodes(
  sucessCallback: (discountCodes: Array<DiscountCode>) => void,
  errorCallback: (message: string) => void
) {
  apiRoot.root
    .discountCodes()
    .get({
      queryArgs: {
        where: ['isActive=true'],
      },
    })
    .execute()
    .then((response) => {
      sucessCallback(response.body.results);
    })
    .catch((error) => {
      errorCallback(error.message);
    });
}
