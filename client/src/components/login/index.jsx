import React from 'react';
import { bindActionCreators } from 'redux';
import { login } from 'src/components/profile/logic/profileActions';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
            password: ''
        };
    }

    handleClickLogin = () => {
        this.props.login({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return !this.props.isAuthorized
            ? (
                <Grid textAlign="center" style={{ height: '100%', width: '100%' }} verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                            Log-in to your account
                        </Header>
                        <Form size="large">
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email or username"
                                    onChange={ev => this.setState({ email: ev.target.value })}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    onChange={ev => this.setState({ password: ev.target.value })}
                                />
                                <Button color="teal" fluid size="large" onClick={this.handleClickLogin}>
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
