import { NotificationManager } from 'react-notifications';

import { NotificationType } from 'common/enums/enums';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {
  [NotificationType.ERROR] = (message = DEFAULT_MESSAGE) => {
    NotificationManager.error(message);
  };

  [NotificationType.SUCCESS] = (message = DEFAULT_MESSAGE) => {
    NotificationManager.success(message);
  };

  [NotificationType.WARNING] = (message = DEFAULT_MESSAGE) => {
    NotificationManager.warn(message);
  };

  [NotificationType.INFO] = (message = DEFAULT_MESSAGE) => {
    NotificationManager.info(message);
  };
}

export { Notification };
