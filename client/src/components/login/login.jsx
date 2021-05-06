import * as React from 'react';
import { useDispatch } from 'react-redux';
import { profileActionCreator } from 'src/store/actions';
import { AppRoute } from 'src/common/enums/enums';
import { Logo, Grid, Message, NavLink } from 'src/components/common/common';
import { LoginForm } from './components/components';
import styles from './styles.module.scss';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = React.useCallback(loginPayload => (
    dispatch(profileActionCreator.login(loginPayload))
  ), [dispatch]);

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        <h2 className={styles.title}>
          Login to your account
        </h2>
        <LoginForm onLogin={handleLogin} />
        <Message>
          New to us?
          {' '}
          <NavLink exact to={AppRoute.REGISTRATION}>
            Sign Up
          </NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
