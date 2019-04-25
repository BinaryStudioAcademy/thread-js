import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { likePost, toggleExpandedPost } from 'src/components/post/logic/postActions';

import styles from './post.module.scss';

class Post extends React.Component {
    handleClickOnLike = () => {
        const { id } = this.props.post;
        this.props.likePost(id);
    }

    handleClickOnExpand = () => {
        const { id } = this.props.post;
        this.props.toggleExpandedPost(id);
    }

    render() {
        const { post } = this.props;
        const {
            user,
            createdAt,
            body,
            likeCount,
            dislikeCount,
            commentCount
        } = post;
        const date = new Date(createdAt);

        return (
            <div className={styles.root}>
                <div className={styles.text}>{body}</div>
                <div className={styles['additional-info']}>
                    <div>{`Created at: ${date.toDateString()} by ${user.username}`}</div>
                    <div>
                        {`Liked ${likeCount} times`}
                        <button type="button" onClick={this.handleClickOnLike}>Like!</button>
                    </div>
                    <div>{`Disliked ${dislikeCount} times`}</div>
                    <div>{`Commented ${commentCount} times`}</div>
                </div>
                <button type="button" onClick={this.handleClickOnExpand}>Show more</button>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    likePost: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired
};

const actions = { likePost, toggleExpandedPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    undefined,
    mapDispatchToProps
)(Post);
