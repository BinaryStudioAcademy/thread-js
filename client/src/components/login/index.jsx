import React from 'react';
import { bindActionCreators } from 'redux';
import { login } from 'src/components/profile/logic/profileActions';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';

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

    handleClickLogin = () => {
        const valid = this.validateForm();
        if (valid) {
            this.props.login({
                email: this.state.email,
                password: this.state.password
            });
        }
    }

    render() {
        return !this.props.isAuthorized
            ? (
                <Grid textAlign="center" verticalAlign="middle" className="fill">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                            Login to your account
                        </Header>
                        <Form name="loginForm" size="large" onSubmit={this.handleClickLogin}>
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email"
                                    type="email"
                                    error={!this.state.isEmailValid}
                                    onChange={ev => this.emailChanged(ev.target.value)}
                                    onBlur={this.validateEmail}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    error={!this.state.isPasswordValid}
                                    onChange={ev => this.passwordChanged(ev.target.value)}
                                    onBlur={this.validatePassword}
                                />
                                <Button type="submit" color="teal" fluid size="large">
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

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized
});

const actions = { login };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
