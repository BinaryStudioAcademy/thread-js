import React from 'react';
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true
        };
    }

    validateEmail = () => {
        const { email } = this.state;
        const isEmailValid = !validator.isEmpty(email);
        this.setState({ isEmailValid });
        return isEmailValid;
    };

    validatePassword = () => {
        const { password } = this.state;
        const isPasswordValid = !validator.isEmpty(password);
        this.setState({ isPasswordValid });
        return isPasswordValid;
    };

    emailChanged = email => this.setState({ email, isEmailValid: true });

    passwordChanged = password => this.setState({ password, isPasswordValid: true });

    validateForm = () => [
        this.validateEmail(),
        this.validatePassword()
    ].every(Boolean);

    handleClickLogin = async () => {
        const { isLoading, email, password } = this.state;
        const valid = this.validateForm();
        if (!valid || isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        try {
            await this.props.login({ email, password });
        } catch {
            // TODO: show error
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isLoading, isEmailValid, isPasswordValid } = this.state;
        return !this.props.isAuthorized
            ? (
                <Grid textAlign="center" verticalAlign="middle" className="fill">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Logo />
                        <Header as="h2" color="teal" textAlign="center">
                            Login to your account
                        </Header>
                        <Form name="loginForm" size="large" onSubmit={this.handleClickLogin}>
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon="at"
                                    iconPosition="left"
                                    placeholder="Email"
                                    type="email"
                                    error={!isEmailValid}
                                    onChange={ev => this.emailChanged(ev.target.value)}
                                    onBlur={this.validateEmail}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    error={!isPasswordValid}
                                    onChange={ev => this.passwordChanged(ev.target.value)}
                                    onBlur={this.validatePassword}
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
            )
            : <Redirect to="/" />;
    }
}

Login.propTypes = {
    isAuthorized: PropTypes.bool,
    login: PropTypes.func.isRequired
};

Login.defaultProps = {
    isAuthorized: false
};

export default Login;
