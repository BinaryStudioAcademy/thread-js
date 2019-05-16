import React from 'react';
import { bindActionCreators } from 'redux';
import { registration } from 'src/components/profile/logic/profileActions';
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

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: ''
        };
    }

    handleClickRegister = async () => {
        this.props.registration({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        });
    }

    render() {
        return !this.props.isAuthorized
            ? (
                <Grid textAlign="center" verticalAlign="middle" className="fill">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                            Sign Up
                        </Header>
                        <Form size="large">
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Email"
                                    type="email"
                                    onChange={ev => this.setState({ email: ev.target.value })}
                                    required
                                />
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    type="text"
                                    onChange={ev => this.setState({ username: ev.target.value })}
                                    required
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    onChange={ev => this.setState({ password: ev.target.value })}
                                    required
                                />
                                <Button type="submit" color="teal" fluid size="large" onClick={this.handleClickRegister}>
                                    Login
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
