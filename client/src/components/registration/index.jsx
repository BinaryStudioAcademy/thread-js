import React from 'react';
import { bindActionCreators } from 'redux';
import { registration } from 'src/components/profile/logic/profileActions';
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

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
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
        const valid = this.validateForm();
        if (valid) {
            this.props.registration({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            });
        }
    };

    render() {
        return !this.props.isAuthorized
            ? (
                <Grid textAlign="center" verticalAlign="middle" className="fill">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                            Register for free account
                        </Header>
                        <Form name="registrationForm" size="large" onSubmit={this.handleClickRegister}>
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
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    type="text"
                                    error={!this.state.isUsernameValid}
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
                                    error={!this.state.isPasswordValid}
                                    onBlur={this.validatePassword}
                                />
                                <Button type="submit" color="teal" fluid size="large">
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

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized
});

const actions = { registration };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
