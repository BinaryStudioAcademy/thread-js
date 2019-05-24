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

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            isLoading: false,
            isEmailValid: true,
            isUsernameValid: true,
            isPasswordValid: true
        };
    }

    validateEmail = () => {
        const { email } = this.state;
        const isEmailValid = validator.isEmail(email);
        this.setState({ isEmailValid });
        return isEmailValid;
    };

    validateUsername = () => {
        const { username } = this.state;
        const isUsernameValid = !validator.isEmpty(username);
        this.setState({ isUsernameValid });
        return isUsernameValid;
    };

    validatePassword = () => {
        const { password } = this.state;
        const isPasswordValid = !validator.isEmpty(password);
        this.setState({ isPasswordValid });
        return isPasswordValid;
    };

    emailChanged = email => this.setState({ email, isEmailValid: true });

    usernameChanged = username => this.setState({ username, isUsernameValid: true });

    passwordChanged = password => this.setState({ password, isPasswordValid: true });

    validateForm = () => [
        this.validateEmail(),
        this.validateUsername(),
        this.validatePassword()
    ].every(Boolean);

    handleClickRegister = async () => {
        const { isLoading, email, password, username } = this.state;
        const valid = this.validateForm();
        if (!valid || isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        try {
            await this.props.registration({ email, password, username });
        } catch {
            // TODO: show error
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { isLoading, isEmailValid, isUsernameValid, isPasswordValid } = this.state;
        return !this.props.isAuthorized
            ? (
                <Grid textAlign="center" verticalAlign="middle" className="fill">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Logo />
                        <Header as="h2" color="teal" textAlign="center">
                            Register for free account
                        </Header>
                        <Form name="registrationForm" size="large" onSubmit={this.handleClickRegister}>
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
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    type="text"
                                    error={!isUsernameValid}
                                    onChange={ev => this.usernameChanged(ev.target.value)}
                                    onBlur={this.validateUsername}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    onChange={ev => this.passwordChanged(ev.target.value)}
                                    error={!isPasswordValid}
                                    onBlur={this.validatePassword}
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
            )
            : <Redirect to="/" />;
    }
}

Registration.propTypes = {
    isAuthorized: PropTypes.bool,
    registration: PropTypes.func.isRequired
};

Registration.defaultProps = {
    isAuthorized: undefined
};

export default Registration;
