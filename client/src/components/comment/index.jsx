import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Comment as CommentUI } from 'semantic-ui-react';
import moment from 'moment';

const Comment = (props) => {
    const { comment } = props;
    const { body, createdAt, user } = comment;
    const date = moment(createdAt).fromNow();
    const avatar = user.image ? user.image.link : 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png';
    return (
        <CommentUI>
            <CommentUI.Avatar src={avatar} />
            <CommentUI.Content>
                <CommentUI.Author as="a">
                    {user.username}
                </CommentUI.Author>
                <CommentUI.Metadata>
                    {date}
                </CommentUI.Metadata>
                <CommentUI.Text>
                    {body}
                </CommentUI.Text>
            </CommentUI.Content>
        </CommentUI>
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
