import PropTypes from 'prop-types';
import { useAppForm, useState } from 'hooks/hooks';
import {
  ButtonType,
  ButtonSize,
  ButtonColor,
  AppRoute,
  IconName,
  UserPayloadKey
} from 'common/enums/enums';
import {
  Button,
  Form,
  FormInput,
  Segment,
  Message,
  NavLink
} from 'components/common/common';
import { login as loginValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
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
      <Form name="loginForm" size="large" onSubmit={handleSubmit(handleLogin)}>
        <Segment>
          <fieldset disabled={isLoading} className={styles.fieldset}>
            <FormInput
              name={UserPayloadKey.EMAIL}
              type="email"
              placeholder="Email"
              iconName={IconName.AT}
              control={control}
              errors={errors}
            />
            <FormInput
              name={UserPayloadKey.PASSWORD}
              type="password"
              placeholder="Password"
              iconName={IconName.LOCK}
              control={control}
              errors={errors}
            />
            <Button
              type={ButtonType.SUBMIT}
              color={ButtonColor.TEAL}
              size={ButtonSize.LARGE}
              isLoading={isLoading}
              isFluid
              isPrimary
            >
              Login
            </Button>
          </fieldset>
        </Segment>
      </Form>
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

export default LoginForm;
