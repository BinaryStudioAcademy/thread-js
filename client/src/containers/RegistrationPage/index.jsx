import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import { Grid, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import RegistrationForm from 'src/components/RegistrationForm';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleRegister = useCallback(registerPayload => {
    dispatch(register(registerPayload));
  }, [dispatch]);

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
