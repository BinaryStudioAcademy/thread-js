import React from 'react';

import styles from './post.module.scss';

const Post = (props) => {
    const { post } = props;
    const { user, createdAt, body, likeCount, dislikeCount, commentCount } = post;
    const date = new Date(createdAt);
    return <div className={styles["root"]}>
        <div className={styles['text']}>{body}</div>
        <div className={styles['additional-info']}>
            <div>{`Created at: ${date.toDateString()} by ${user.username}`}</div>
            <div>{`Liked ${likeCount} times`}</div>
            <div>{`Disliked ${dislikeCount} times`}</div>
            <div>{`Commented ${commentCount} times`}</div>
        </div>
    </div>
}

export default Post;
