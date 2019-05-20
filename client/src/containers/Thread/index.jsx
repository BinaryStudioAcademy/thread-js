import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ExpandedPost from 'src/containers/ExpandedPost';
import Post from 'src/components/Post';
import AddPost from 'src/components/AddPost';
import PropTypes from 'prop-types';
import * as imageService from 'src/services/imageService';
import { loadAllPosts, likePost, toggleExpandedPost, addPost } from './actions';
import { getFilteredPosts } from './helper';

import styles from './styles';

class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadAllPosts();
        this.state = {
            postsType: 'all'
        };
    }

    showPosts = (postsType) => {
        this.setState({ postsType });
    }

    uploadImage = file => imageService.uploadImage(file);

    render() {
        const { posts = [], userId, expandedPostId, ...props } = this.props;
        const { postsType } = this.state;
        const filteredPosts = getFilteredPosts({ posts, postsType, currentUserId: userId });
        return (
            <div style={styles.threadContent}>
                <div onClick={() => this.showPosts('mine')}>My Posts</div>
                <div onClick={() => this.showPosts('all')}>All Posts</div>
                <div style={styles.addPostForm}>
                    <AddPost addPost={props.addPost} uploadImage={this.uploadImage} />
                </div>
                <div>
                    {filteredPosts.map(post => (
                        <Post
                            post={post}
                            likePost={props.likePost}
                            toggleExpandedPost={props.toggleExpandedPost}
                            key={post.id}
                        />
                    ))}
                </div>
                {expandedPostId && <ExpandedPost postId={expandedPostId} />}
            </div>
        );
    }
}

Thread.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    expandedPostId: PropTypes.string,
    userId: PropTypes.string,
    loadAllPosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired
};

Thread.defaultProps = {
    posts: [],
    expandedPostId: undefined,
    userId: undefined
};

const mapStateToProps = rootState => ({
    posts: rootState.posts.posts,
    expandedPostId: rootState.posts.expandedPostId,
    userId: rootState.profile.user.id
});

const actions = {
    loadAllPosts,
    likePost,
    toggleExpandedPost,
    addPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
