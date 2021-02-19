import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Image,
  Input
} from 'semantic-ui-react';
import { getUserImgLink } from 'src/helpers';
import { userType } from 'src/common/propTypes';

const Profile = ({ user }) => (
  <Grid container textAlign="center" style={{ paddingTop: 30 }}>
    <Grid.Column>
      <Image centered src={getUserImgLink(user.image)} size="medium" circular />
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

Profile.propTypes = {
  user: userType.isRequired
};

const mapStateToProps = rootState => ({
  user: rootState.profile.user
});

export default connect(
  mapStateToProps
)(Profile);
