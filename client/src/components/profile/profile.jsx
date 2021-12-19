import { useSelector } from 'hooks/hooks';
import { Grid, Image, Input } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { IconName } from 'common/enums/enums';

const Profile = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column>
        <Image
          centered
          src={user.image?.link ?? DEFAULT_USER_AVATAR}
          size="medium"
          circular
        />
        <br />
        <Input
          iconName={IconName.USER}
          placeholder="Username"
          value={user.username}
          disabled
        />
        <br />
        <br />
        <Input
          iconName={IconName.AT}
          placeholder="Email"
          type="email"
          value={user.email}
          disabled
        />
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
