import { Image } from '~/libs/components/image/image';
import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useDispatch, useLocation } from '~/libs/hooks/hooks.js';
import { actions as profileActionCreator } from '~/slices/profile/profile.js';

import { LoginForm, RegistrationForm } from './components/components.js';
import styles from './styles.module.scss';

const Sign = () => {
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
    <div className={styles.login}>
      <section className={styles.form}>
        <h2 className={styles.logoWrapper}>
          <Image
            alt="Thread logo"
            width="75"
            height="75"
            isCircular
            src="http://s1.iconbird.com/ico/2013/8/428/w256h2561377930292cattied.png"
          />
          Thread
        </h2>
        {getScreen(pathname)}
      </section>
    </div>
  );
};

export { Sign };
