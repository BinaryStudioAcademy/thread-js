import { toast } from 'react-toastify';

import { NotificationType } from './libs/enums/enums.js';
import { type NotificationApi } from './libs/types/types.js';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification implements NotificationApi {
  public [NotificationType.ERROR] = (message = DEFAULT_MESSAGE): void => {
    toast.error(message);
  };

  public [NotificationType.SUCCESS] = (message = DEFAULT_MESSAGE): void => {
    toast.success(message);
  };

  public [NotificationType.WARNING] = (message = DEFAULT_MESSAGE): void => {
    toast.warn(message);
  };

  public [NotificationType.INFO] = (message = DEFAULT_MESSAGE): void => {
    toast.info(message);
  };
}

export { Notification };
