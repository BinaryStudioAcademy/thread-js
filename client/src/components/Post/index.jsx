import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { likePost, toggleExpandedPost } from 'src/components/Post/logic/postActions';
import { Card, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

const styles = {
    toolbarBtn: {
        border: 'none'
    }
};

class Post extends React.Component {
    handleClickOnLike = () => {
        const { id } = this.props.post;
        this.props.likePost(id);
    }

    handleClickOnShowComments = () => {
        const { id } = this.props.post;
        this.props.toggleExpandedPost(id);
    }

    render() {
        const { post } = this.props;
        const {
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
            <Card style={{ width: '100%' }}>
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
                    <Label basic size="small" as="a" style={styles.toolbarBtn} onClick={this.handleClickOnLike}>
                        <Icon name="thumbs up" />
                        {likeCount}
                    </Label>
                    <Label basic size="small" as="a" style={styles.toolbarBtn}>
                        <Icon name="thumbs down" />
                        {dislikeCount}
                    </Label>
                    <Label basic size="small" as="a" style={styles.toolbarBtn} onClick={this.handleClickOnShowComments}>
                        <Icon name="comment" />
                        {commentCount}
                    </Label>
                </Card.Content>
            </Card>
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
