import * as React from 'react';
import { useDispatch } from 'react-redux';
import { profileActionCreator } from 'src/store/actions';
import { AppRoute } from 'src/common/enums/enums';
import { Logo, Grid, Message, NavLink } from 'src/components/common/common';
import { RegistrationForm } from './components/components';
import styles from './styles.module.scss';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleRegister = React.useCallback(registerPayload => (
    dispatch(profileActionCreator.register(registerPayload))
  ), [dispatch]);

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        <h2 className={styles.title}>
          Register for free account
        </h2>
        <RegistrationForm onRegister={handleRegister} />
        <Message>
          Alredy with us?
          {' '}
          <NavLink exact to={AppRoute.LOGIN}>
            Sign In
          </NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegistrationPage;
