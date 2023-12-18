import { type ValueOf } from '~/libs/types/types.js';

import { type NotificationType } from '../enums/enums.js';

type NotificationApi = {
  [K in ValueOf<typeof NotificationType>]: (message?: string) => void;
};

export { type NotificationApi };
