import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

import styles from './styles';

const Post = ({ post, likePost, toggleExpandedPost, style, key }) => {
    const {
        id,
        image,
        body,
        user,
        likeCount,
        dislikeCount,
        commentCount,
        createdAt
    } = post;
    const date = moment(createdAt).fromNow();

    return (
        <Card style={{ ...style, width: '100%' }} key={key}>
            {image && <Image src={image.link} wrapped ui={false} />}
            <Card.Content>
                <Card.Meta>
                    <span className="date">
                        posted by
                        {' '}
                        {user.username}
                        {' - '}
                        {date}
                    </span>
                </Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Label basic size="small" as="a" style={styles.toolbarBtn} onClick={() => likePost(id)}>
                    <Icon name="thumbs up" />
                    {likeCount}
                </Label>
                <Label basic size="small" as="a" style={styles.toolbarBtn}>
                    <Icon name="thumbs down" />
                    {dislikeCount}
                </Label>
                <Label basic size="small" as="a" style={styles.toolbarBtn} onClick={() => toggleExpandedPost(id)}>
                    <Icon name="comment" />
                    {commentCount}
                </Label>
            </Card.Content>
        </Card>
    );
};


Post.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    likePost: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    style: PropTypes.objectOf(PropTypes.any),
    key: PropTypes.string
};

Post.defaultProps = {
    style: {},
    key: undefined
};

export default Post;
