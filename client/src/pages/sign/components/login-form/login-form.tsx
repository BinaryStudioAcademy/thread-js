import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Button } from '~/libs/components/button/button.jsx';
import { Input } from '~/libs/components/input/input.jsx';
import { Message } from '~/libs/components/message/message.jsx';
import { Segment } from '~/libs/components/segment/segment.jsx';
import {
  AppRoute,
  ButtonColor,
  ButtonSize,
  IconName
} from '~/libs/enums/enums.js';
import { useAppForm, useState } from '~/libs/hooks/hooks.js';
import { login as loginValidationSchema } from '~/packages/auth/libs/validation-schemas/validation-schemas.js';
import { UserPayloadKey } from '~/packages/user/enums/enums.js';

import { DEFAULT_LOGIN_PAYLOAD } from './libs/common/constants.js';
import styles from './styles.module.scss';

const LoginForm = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: loginValidationSchema
  });

  const handleLogin = values => {
    setIsLoading(true);

    onLogin(values)
      .unwrap()
      .catch(() => {
        // TODO: show error
        setIsLoading(false);
      });
  };

  return (
    <>
      <h2 className={styles.title}>Login to your account</h2>
      <form name="loginForm" onSubmit={handleSubmit(handleLogin)}>
        <Segment>
          <fieldset disabled={isLoading} className={styles.fieldset}>
            <Input
              name={UserPayloadKey.EMAIL}
              type="email"
              placeholder="Email"
              iconName={IconName.AT}
              control={control}
              errors={errors}
            />
            <Input
              name={UserPayloadKey.PASSWORD}
              type="password"
              placeholder="Password"
              iconName={IconName.LOCK}
              control={control}
              errors={errors}
            />
            <Button
              type={'submit'}
              color={ButtonColor.TEAL}
              isLoading={isLoading}
              isFluid
              isPrimary
            >
              Login
            </Button>
          </fieldset>
        </Segment>
      </form>
      <Message>
        <span>New to us?</span>
        <NavLink to={AppRoute.REGISTRATION}>Sign Up</NavLink>
      </Message>
    </>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export { LoginForm };
