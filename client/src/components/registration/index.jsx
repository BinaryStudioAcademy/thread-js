import React from 'react';
import { bindActionCreators } from 'redux';
import { registration } from 'src/components/profile/logic/profileActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './registration.module.scss';

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
        const { user } = this.props;
        return !(user && user.id)
            ? (
                <div className={styles.root}>
                    <input type="email" onChange={ev => this.setState({ email: ev.target.value })} />
                    <input type="text" onChange={ev => this.setState({ username: ev.target.value })} />
                    <input type="password" onChange={ev => this.setState({ password: ev.target.value })} />
                    <button type="submit" onClick={this.handleClickRegister}>Registration</button>
                </div>
            )
            : <Redirect to="/" />;
    }
}

Registration.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    registration: PropTypes.func.isRequired
};

Registration.defaultProps = {
    user: undefined
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});

const actions = { registration };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
