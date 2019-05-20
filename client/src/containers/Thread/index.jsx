import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ExpandedPost from 'src/containers/ExpandedPost';
import Post from 'src/components/Post';
import AddPost from 'src/components/AddPost';
import PropTypes from 'prop-types';
import { likePost, toggleExpandedPost } from 'src/components/Post/logic/postActions';
import { loadAllPosts } from './logic/threadActions';
import { getFilteredPosts } from './logic/threadHelper';

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

    render() {
        const { posts = [], userId, expandedPostId, ...props } = this.props;
        const { postsType } = this.state;
        const filteredPosts = getFilteredPosts({ posts, postsType, currentUserId: userId });
        return (
            <div style={styles.threadContent}>
                <div onClick={() => this.showPosts('mine')}>My Posts</div>
                <div onClick={() => this.showPosts('all')}>All Posts</div>
                <div style={styles.addPostForm}>
                    <AddPost />
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
    loadAllPosts: PropTypes.func.isRequired,
    expandedPostId: PropTypes.string,
    userId: PropTypes.string
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

const actions = { loadAllPosts, likePost, toggleExpandedPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
