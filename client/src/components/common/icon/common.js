import {
  faAt,
  faCircleNotch,
  faComment,
  faCopy,
  faFrown,
  faImage,
  faLock,
  faShareAlt,
  faSignOutAlt,
  faThumbsDown,
  faThumbsUp,
  faUser,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { IconName } from 'common/enums/enums';

const iconNameToSvgIcon = {
  [IconName.AT]: faAt,
  [IconName.COMMENT]: faComment,
  [IconName.COPY]: faCopy,
  [IconName.FROWN]: faFrown,
  [IconName.IMAGE]: faImage,
  [IconName.LOCK]: faLock,
  [IconName.LOG_OUT]: faSignOutAlt,
  [IconName.SHARE_ALTERNATE]: faShareAlt,
  [IconName.SPINNER]: faCircleNotch,
  [IconName.THUMBS_UP]: faThumbsUp,
  [IconName.THUMBS_DOWN]: faThumbsDown,
  [IconName.USER]: faUser,
  [IconName.USER_CIRCLE]: faUserCircle
};

export { iconNameToSvgIcon };
