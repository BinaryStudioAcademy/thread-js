import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './comment.module.scss';

const Comment = (props) => {
    const { comment } = props;
    const {
        body, createdAt, updatedAt, user
    } = comment;
    const createdAtDate = new Date(createdAt);
    const updatedAtDate = new Date(updatedAt);
    return (
        <div className={styles.root}>
            <div>{body}</div>
            <div>{`Created at: ${createdAtDate.toDateString()} by ${user.username}`}</div>
            <div>{`Updated at: ${updatedAtDate.toDateString()}`}</div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.objectOf(PropTypes.any).isRequired
};

const actions = { };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    undefined,
    mapDispatchToProps
)(Comment);
