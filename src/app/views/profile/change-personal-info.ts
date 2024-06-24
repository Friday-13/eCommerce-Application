import ApiRoot from '@services/api-root';
import { showErrorMessage, showSucessMessage } from '@utils/toast-messages';

export default function updateCustomerPersonalInfo(
  firstName: string,
  lastName: string,
  dateOfBirth: string
) {
  ApiRoot.root
    .me()
    .get()
    .execute()
    .then((response) => {
      const currentVersion = response.body.version;

      ApiRoot.root
        .me()
        .post({
          body: {
            actions: [
              {
                action: 'setFirstName',
                firstName,
              },
              {
                action: 'setLastName',
                lastName,
              },
              {
                action: 'setDateOfBirth',
                dateOfBirth,
              },
            ],
            version: currentVersion,
          },
        })
        .execute()
        .then(() => {
          showSucessMessage(
            'Your personal information is successfully updated '
          );
        })
        .catch(() => {
          showErrorMessage('Error updating user information');
        });
    })
    .catch(() => {
      showErrorMessage('Error fetching user information');
    });
}
