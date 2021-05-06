import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppRoute } from 'src/common/enums/enums';
import { profileActionCreator } from 'src/store/actions';
import { Logo, Grid } from 'src/components/common/common';
import { LoginForm, RegistrationForm } from './components/components';

const Login = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogin = React.useCallback(loginPayload => (
    dispatch(profileActionCreator.login(loginPayload))
  ), [dispatch]);

  const handleRegister = React.useCallback(registerPayload => (
    dispatch(profileActionCreator.register(registerPayload))
  ), [dispatch]);

  const getScreen = path => {
    switch (path) {
      case AppRoute.LOGIN: {
        return <LoginForm onLogin={handleLogin} />;
      }
      case AppRoute.REGISTRATION: {
        return <RegistrationForm onRegister={handleRegister} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        {getScreen(pathname)}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
