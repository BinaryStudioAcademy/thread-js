import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Message } from 'semantic-ui-react';
import { login } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import LoginForm from 'src/components/LoginForm';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = loginPayload => dispatch(login(loginPayload));

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        <Header as="h2" color="teal" textAlign="center">
          Login to your account
        </Header>
        <LoginForm onLogin={handleLogin} />
        <Message>
          New to us?
          {' '}
          <NavLink exact to="/registration">
            Sign Up
          </NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
