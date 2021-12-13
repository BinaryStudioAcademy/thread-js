import { useSelector } from 'hooks/hooks';
import { Grid, Image, Input } from 'components/common/common';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { ImageSize } from 'common/enums/enums';

const Profile = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column>
        <Image
          alt="profile avatar"
          centered
          src={user.image?.link ?? DEFAULT_USER_AVATAR}
          size={ImageSize.MEDIUM}
          circular
        />
        <br />
        <Input
          icon="user"
          iconPosition="left"
          placeholder="Username"
          type="text"
          disabled
          value={user.username}
        />
        <br />
        <br />
        <Input
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          disabled
          value={user.email}
        />
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
