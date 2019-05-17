import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Comment = (props) => {
    const { comment } = props;
    const {
        body, createdAt, updatedAt, user
    } = comment;
    const createdAtDate = new Date(createdAt);
    const updatedAtDate = new Date(updatedAt);
    return (
        <div>
            <div>{body}</div>
            <div>
                {`Created at: ${createdAtDate.toDateString()} by ${user.username}`}
                {user.image && <img src={user.image.link} alt="avatar" />}
            </div>
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
