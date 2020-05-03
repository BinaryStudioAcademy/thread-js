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

const Registration = ({ isAuthorized, registration }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isUsernameValid, setUsernameValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const emailChanged = value => {
    setEmail(value);
    setEmailValid(true);
  };

  const usernameChanged = value => {
    setUsername(value);
    setUsernameValid(true);
  };

  const passwordChanged = value => {
    setPassword(value);
    setPasswordValid(true);
  };

  const register = async () => {
    const isValid = isEmailValid && isUsernameValid && isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setLoading(true);
    try {
      await registration({ email, password, username });
    } finally {
      setLoading(false);
    }
  };

  return isAuthorized
    ? <Redirect to="/" />
    : (
      <Grid textAlign="center" verticalAlign="middle" className="fill">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Logo />
          <Header as="h2" color="teal" textAlign="center">
            Register for free account
          </Header>
          <Form name="registrationForm" size="large" onSubmit={register}>
            <Segment>
              <Form.Input
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email"
                type="email"
                error={!isEmailValid}
                onChange={ev => emailChanged(ev.target.value)}
                onBlur={() => setEmailValid(validator.isEmail(email))}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                error={!isUsernameValid}
                onChange={ev => usernameChanged(ev.target.value)}
                onBlur={() => setUsernameValid(Boolean(username))}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={ev => passwordChanged(ev.target.value)}
                error={!isPasswordValid}
                onBlur={() => setPasswordValid(Boolean(password))}
              />
              <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Alredy with us?
            {' '}
            <NavLink exact to="/login">Sign In</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
};

Registration.propTypes = {
  isAuthorized: PropTypes.bool,
  registration: PropTypes.func.isRequired
};

Registration.defaultProps = {
  isAuthorized: undefined
};

export default Registration;
