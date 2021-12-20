import { useSelector } from 'hooks/hooks';
import { Image, Input } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { ImageSize, IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const Profile = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  return (
    <div className={styles.profile}>
      <Image
        alt="profile avatar"
        isCentered
        src={user.image?.link ?? DEFAULT_USER_AVATAR}
        size={ImageSize.MEDIUM}
        isCircular
      />
      <Input
        iconName={IconName.USER}
        placeholder="Username"
        value={user.username}
        disabled
      />
      <Input
        iconName={IconName.AT}
        placeholder="Email"
        type="email"
        value={user.email}
        disabled
      />
    </div>
  );
};

export default Profile;
