import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as imageService from 'src/services/imageService';
import ExpandedPost from 'src/containers/ExpandedPost';
import Post from 'src/components/Post';
import AddPost from 'src/components/AddPost';
import SharedPostLink from 'src/components/SharedPostLink';
import { Checkbox } from 'semantic-ui-react';
import { loadPosts, likePost, toggleExpandedPost, addPost } from './actions';

import styles from './styles';

class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sharedPostId: undefined,
            showOwnPosts: false,
            postsFilter: {
                userId: undefined,
                from: 0,
                count: 10
            }
        };
        this.props.loadPosts(this.state.postsFilter);
    }

    tooglePosts = () => {
        this.setState(({ showOwnPosts, postsFilter }) => ({
            showOwnPosts: !showOwnPosts,
            postsFilter: {
                ...postsFilter,
                userId: !showOwnPosts ? this.props.userId : undefined
            }
        }), () => this.props.loadPosts(this.state.postsFilter));
    };

    sharePost = (sharedPostId) => {
        this.setState({ sharedPostId });
    };

    closeSharePost = () => {
        this.setState({ sharedPostId: undefined });
    }

    uploadImage = file => imageService.uploadImage(file);

    render() {
        const { posts = [], expandedPostId, ...props } = this.props;
        const { showOwnPosts, sharedPostId } = this.state;
        return (
            <div style={styles.threadContent}>
                <div style={styles.threadContent}>
                    <AddPost addPost={props.addPost} uploadImage={this.uploadImage} />
                </div>
                <Checkbox toggle label="Show only my posts" checked={showOwnPosts} onChange={this.tooglePosts} />
                {posts.map(post => (
                    <Post
                        post={post}
                        likePost={props.likePost}
                        toggleExpandedPost={props.toggleExpandedPost}
                        sharePost={this.sharePost}
                        key={post.id}
                    />
                ))}
                {expandedPostId && <ExpandedPost postId={expandedPostId} sharePost={this.sharePost} />}
                {
                    sharedPostId
                    && <SharedPostLink postId={sharedPostId} close={this.closeSharePost} />
                }
            </div>
        );
    }
}

Thread.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    expandedPostId: PropTypes.string,
    sharedPostId: PropTypes.string,
    userId: PropTypes.string,
    loadPosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired
};

Thread.defaultProps = {
    posts: [],
    expandedPostId: undefined,
    sharedPostId: undefined,
    userId: undefined
};

const mapStateToProps = rootState => ({
    posts: rootState.posts.posts,
    expandedPostId: rootState.posts.expandedPostId,
    userId: rootState.profile.user.id
});

const actions = {
    loadPosts,
    likePost,
    toggleExpandedPost,
    addPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
