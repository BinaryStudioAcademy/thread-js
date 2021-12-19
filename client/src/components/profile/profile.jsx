import { useSelector } from 'hooks/hooks';
import { Image, Input } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { ImageSize } from 'common/enums/enums';
import styles from './styles.module.scss';

const Profile = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  return (
    <div className={styles.profile}>
      <Image
        alt="profile avatar"
        centered
        src={user.image?.link ?? DEFAULT_USER_AVATAR}
        size={ImageSize.MEDIUM}
        circular
      />
      <Input
        icon="user"
        iconPosition="left"
        placeholder="Username"
        type="text"
        disabled
        value={user.username}
      />
      <Input
        icon="at"
        iconPosition="left"
        placeholder="Email"
        type="email"
        disabled
        value={user.email}
      />
    </div>
  );
};

export default Profile;
