import React from 'react';
import { bindActionCreators } from 'redux';
import * as loginActions from './logic/loginActions';
import { connect } from 'react-redux';

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
        return <div className={styles["root"]}>
            <input onChange={(ev) => this.setState({ email: ev.target.value }) } />
            <input onChange={(ev) => this.setState({ password: ev.target.value }) } />
            <button onClick={this.handleClickLogin}>Login</button>
        </div>
    }
}

const mapStateToProps = (rootState) => {
    return {};
}

const mapDispatchToProps = (dispatch) => bindActionCreators(loginActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)


