import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { register } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import { Grid, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import RegistrationForm from 'src/components/RegistrationForm';

const RegistrationPage = ({ register: signOn }) => (
  <Grid textAlign="center" verticalAlign="middle" className="fill">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Logo />
      <Header as="h2" color="teal" textAlign="center">
        Register for free account
      </Header>
      <RegistrationForm register={signOn} />
      <Message>
        Alredy with us?
        {' '}
        <NavLink exact to="/login">Sign In</NavLink>
      </Message>
    </Grid.Column>
  </Grid>
);

RegistrationPage.propTypes = {
  register: PropTypes.func.isRequired
};

const actions = { register };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(RegistrationPage);
