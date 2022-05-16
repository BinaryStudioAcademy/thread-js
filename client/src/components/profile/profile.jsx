import { useAppForm, useSelector } from 'hooks/hooks';
import { Image, Input } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { ImageSize, IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const Profile = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  const { control } = useAppForm({
    defaultValues: {
      username: user.username,
      email: user.email
    }
  });

  return (
    <form name="profile">
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
          name="username"
          value={user.username}
          control={control}
          disabled
        />
        <Input
          iconName={IconName.AT}
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          control={control}
          disabled
        />
      </div>
    </form>
  );
};

export default Profile;
