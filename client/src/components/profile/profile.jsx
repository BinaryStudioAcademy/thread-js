import { useSelector } from 'hooks/hooks';
import { Grid, Icon, Image, Input } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';

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
          icon={<Icon name="user" />}
          placeholder="Username"
          value={user.username}
          disabled
        />
        <br />
        <br />
        <Input
          icon={<Icon name="at" />}
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
