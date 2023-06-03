import { toast } from 'react-toastify';
import { NotificationType } from './libs/enums/enums.js';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {
  [NotificationType.ERROR] = (message = DEFAULT_MESSAGE) => {
    toast.error(message);
  };

  [NotificationType.SUCCESS] = (message = DEFAULT_MESSAGE) => {
    toast.success(message);
  };

  [NotificationType.WARNING] = (message = DEFAULT_MESSAGE) => {
    toast.warn(message);
  };

  [NotificationType.INFO] = (message = DEFAULT_MESSAGE) => {
    toast.info(message);
  };
}

export { Notification };
