import React from 'react';
import { bindActionCreators } from 'redux';
import * as profileActions from 'src/components/profile/logic/profileActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './login.module.scss';

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
        const { token } = this.props;
        return !token
            ? (
                <div className={styles.root}>
                    <input onChange={ev => this.setState({ email: ev.target.value }) } />
                    <input onChange={ev => this.setState({ password: ev.target.value }) } />
                    <button type="submit" onClick={this.handleClickLogin}>Login</button>
                </div>
            )
            : <Redirect to="/" />;
    }
}

Login.propTypes = {
    token: PropTypes.string,
    login: PropTypes.func
};

const mapStateToProps = rootState => ({
    token: rootState.profile.token
});

const mapDispatchToProps = dispatch => bindActionCreators(profileActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
