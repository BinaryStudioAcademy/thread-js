import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Comment as CommentUI, Header } from 'semantic-ui-react';
import { loadPostComments, toggleExpandedPost } from 'src/components/Post/logic/postActions';
import Post from 'src/components/Post';
import Comment from 'src/components/Comment';
import AddComment from 'src/components/AddComment';
import moment from 'moment';

class ExpandedPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    componentDidMount() {
        const { post } = this.props;
        if (post && !post.comments) {
            this.props.loadPostComments(this.props.postId);
        }
    }

    closeModal = () => {
        this.props.toggleExpandedPost();
    }

    render() {
        const { post } = this.props;
        const { comments } = post;
        return (
            <Modal open={this.state.open} onClose={this.closeModal}>
                <Modal.Content>
                    <Post post={post} />
                    <CommentUI.Group style={{ maxWidth: '100%' }}>
                        <Header as="h3" dividing>
                            Comments
                        </Header>
                        {
                            comments
                            && comments
                                .sort((c1, c2) => moment(c1.createdAt).diff(c2.createdAt))
                                .map(c => <Comment key={c.id} comment={c} />)
                        }
                        <AddComment postId={post.id} />
                    </CommentUI.Group>
                </Modal.Content>
            </Modal>
        );
    }
}

ExpandedPost.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    loadPostComments: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    postId: PropTypes.string
};

ExpandedPost.defaultProps = {
    postId: undefined
};

const mapStateToProps = (rootState, ownProps) => {
    const { posts } = rootState.posts;
    const { postId } = ownProps;
    const post = postId && posts && posts.find(p => (p.id === postId));
    return { post };
};

const actions = { loadPostComments, toggleExpandedPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedPost);
