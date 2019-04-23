import React from 'react';
import PropTypes from 'prop-types';

import styles from './post.module.scss';

const Post = (props) => {
    const { post } = props;
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
                <div>{`Liked ${likeCount} times`}</div>
                <div>{`Disliked ${dislikeCount} times`}</div>
                <div>{`Commented ${commentCount} times`}</div>
            </div>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
