import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Comment as CommentUI, Header } from 'semantic-ui-react';
import moment from 'moment';
import { likePost, toggleExpandedPost, addComment } from 'src/containers/Thread/actions';
import Post from 'src/components/Post';
import Comment from 'src/components/Comment';
import AddComment from 'src/components/AddComment';
import Spinner from 'src/components/Spinner';

class ExpandedPost extends React.Component {
    state = {
        open: true
    };

    closeModal = () => {
        this.props.toggleExpandedPost();
    }

    render() {
        const { post, sharePost, ...props } = this.props;
        return (
            <Modal dimmer="blurring" centered={false} open={this.state.open} onClose={this.closeModal}>
                {post
                    ? (
                        <Modal.Content>
                            <Post
                                post={post}
                                likePost={props.likePost}
                                toggleExpandedPost={props.toggleExpandedPost}
                                sharePost={sharePost}
                            />
                            <CommentUI.Group style={{ maxWidth: '100%' }}>
                                <Header as="h3" dividing>
                                    Comments
                                </Header>
                                {post.comments && post.comments
                                    .sort((c1, c2) => moment(c1.createdAt).diff(c2.createdAt))
                                    .map(comment => <Comment key={comment.id} comment={comment} />)
                                }
                                <AddComment postId={post.id} addComment={props.addComment} />
                            </CommentUI.Group>
                        </Modal.Content>
                    )
                    : <Spinner />
                }
            </Modal>
        );
    }
}

ExpandedPost.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    sharePost: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
    post: rootState.posts.expandedPost
});
const actions = { likePost, toggleExpandedPost, addComment };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedPost);
