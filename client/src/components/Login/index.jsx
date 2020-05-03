import React, { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';
import Logo from 'src/components/Logo';
import {
  Grid,
  Header,
  Form,
  Button,
  Segment,
  Message
} from 'semantic-ui-react';

const Login = ({ isAuthorized, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const emailChanged = data => {
    setEmail(data);
    setIsEmailValid(true);
  };

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
  };

  const handleLoginClick = async () => {
    const isValid = isEmailValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await login({ email, password });
    } finally {
      // TODO: show error
      setIsLoading(false);
    }
  };

  return isAuthorized
    ? <Redirect to="/" />
    : (
      <Grid textAlign="center" verticalAlign="middle" className="fill">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Logo />
          <Header as="h2" color="teal" textAlign="center">
            Login to your account
          </Header>
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
              <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            {' '}
            <NavLink exact to="/registration">Sign Up</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
};

Login.propTypes = {
  isAuthorized: PropTypes.bool,
  login: PropTypes.func.isRequired
};

Login.defaultProps = {
  isAuthorized: false
};

export default Login;
