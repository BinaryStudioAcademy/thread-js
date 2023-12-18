import { Image } from '~/libs/components/image/image.js';
import { Input } from '~/libs/components/input/input.js';
import { IconName, ImageSize } from '~/libs/enums/enums.js';
import { useAppForm, useAppSelector } from '~/libs/hooks/hooks.js';
import { DEFAULT_USER_AVATAR } from '~/packages/user/constants/constants.js';
import { type UserWithImageRelation } from '~/packages/user/user.js';

import styles from './styles.module.scss';

const Profile: React.FC = () => {
  const { user } = useAppSelector(state => ({
    user: state.profile.user
  }));

  const { control } = useAppForm({
    defaultValues: {
      username: (user as UserWithImageRelation).username,
      email: (user as UserWithImageRelation).email
    }
  });

  return (
    <form name="profile" className={styles['profile']}>
      <Image
        alt="profile avatar"
        isCentered
        src={(user as UserWithImageRelation).image?.link ?? DEFAULT_USER_AVATAR}
        size={ImageSize.MEDIUM}
        isCircular
      />
      <fieldset disabled className={styles['fieldset']}>
        <Input
          iconName={IconName.USER}
          placeholder="Username"
          name="username"
          control={control}
        />
        <Input
          iconName={IconName.AT}
          placeholder="Email"
          name="email"
          type="email"
          control={control}
        />
      </fieldset>
    </form>
  );
};

export { Profile };
