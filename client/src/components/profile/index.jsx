import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import formsStyles from 'src/styles/_forms.scss';
import styles from './profile.module.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.user);
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={formsStyles['form-line']}>
                    <span className={formsStyles['form-title']}>username:</span>
                    <span>{this.props.user.username}</span>
                </div>
                <div className={formsStyles['form-line']}>
                    <span className={formsStyles['form-title']}>email:</span>
                    <span>{this.props.user.email}</span>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.objectOf(PropTypes.any)
};

Profile.defaultProps = {
    user: {}
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});


export default connect(
    mapStateToProps
)(Profile);
