import { useCallback, useDispatch, useLocation } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import { profileActionCreator } from 'store/actions';
import { Grid, Image } from 'components/common/common';
import { LoginForm, RegistrationForm } from './components/components';
import styles from './styles.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogin = useCallback(
    loginPayload => dispatch(profileActionCreator.login(loginPayload)),
    [dispatch]
  );

  const handleRegister = useCallback(
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
            alt="Thread logo"
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
