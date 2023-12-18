import { Notification as NotificationApi } from './notification-api.js';

const notificationApi = new NotificationApi();

export { notificationApi };
export {
  type NotificationApi,
  type NotificationPayload
} from './libs/types/types.js';
