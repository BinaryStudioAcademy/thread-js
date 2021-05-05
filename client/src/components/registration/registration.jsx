import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Message } from 'semantic-ui-react';
import { profileActionCreator } from 'src/store/actions';
import { Logo } from 'src/components/common/common';
import { RegistrationForm } from './components/components';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleRegister = useCallback(
    registerPayload => {
      dispatch(profileActionCreator.register(registerPayload));
    },
    [dispatch]
  );

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        <Header as="h2" color="teal" textAlign="center">
          Register for free account
        </Header>
        <RegistrationForm onRegister={handleRegister} />
        <Message>
          Alredy with us?
          {' '}
          <NavLink exact to="/login">
            Sign In
          </NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegistrationPage;
