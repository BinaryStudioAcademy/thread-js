import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppRoute } from 'src/common/enums/enums';
import { profileActionCreator } from 'src/store/actions';
import { Grid, Image } from 'src/components/common/common';
import { LoginForm, RegistrationForm } from './components/components';
import styles from './styles.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogin = React.useCallback(
    loginPayload => dispatch(profileActionCreator.login(loginPayload)),
    [dispatch]
  );

  const handleRegister = React.useCallback(
    registerPayload => dispatch(profileActionCreator.register(registerPayload)),
    [dispatch]
  );

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
        <h2 className={styles.logoWrapper}>
          <Image
            width="75"
            height="75"
            circular
            src="http://s1.iconbird.com/ico/2013/8/428/w256h2561377930292cattied.png"
          />
          Thread
        </h2>
        {getScreen(pathname)}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
