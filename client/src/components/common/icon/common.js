import { IconName } from 'common/enums/enums';
import {
  faUserCircle,
  faSignOutAlt,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faShareAlt,
  faFrown,
  faImage,
  faCopy
} from '@fortawesome/free-solid-svg-icons';

const iconNameToSvgIcon = {
  [IconName.USER_CIRCLE]: faUserCircle,
  [IconName.LOG_OUT]: faSignOutAlt,
  [IconName.THUMBS_UP]: faThumbsUp,
  [IconName.THUMBS_DOWN]: faThumbsDown,
  [IconName.COMMENT]: faComment,
  [IconName.SHARE_ALTERNATE]: faShareAlt,
  [IconName.FROWN]: faFrown,
  [IconName.IMAGE]: faImage,
  [IconName.COPY]: faCopy
};

export { iconNameToSvgIcon };
