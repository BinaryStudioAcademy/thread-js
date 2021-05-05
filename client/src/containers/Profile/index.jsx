import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Image, Input } from 'semantic-ui-react';
import { getUserImgLink } from 'src/helpers';

const Profile = () => {
  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column>
        <Image
          centered
          src={getUserImgLink(user.image)}
          size="medium"
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
