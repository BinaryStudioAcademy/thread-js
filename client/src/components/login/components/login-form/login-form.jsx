import * as React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Form, Segment } from 'semantic-ui-react';
import { ButtonType, ButtonSize, ButtonColor } from 'src/common/enums/enums';
import { Button } from 'src/components/common/common';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const emailChanged = data => {
    setEmail(data);
    setIsEmailValid(true);
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
  };

  const handleLoginClick = () => {
    const isValid = isEmailValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);

    onLogin({ email, password }).catch(() => {
      // TODO: show error
      setIsLoading(false);
    });
  };

  return (
    <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
      <Segment>
        <Form.Input
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          error={!isEmailValid}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={() => setIsEmailValid(validator.isEmail(email))}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          error={!isPasswordValid}
          onChange={ev => passwordChanged(ev.target.value)}
          onBlur={() => setIsPasswordValid(Boolean(password))}
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
      </Segment>
    </Form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
