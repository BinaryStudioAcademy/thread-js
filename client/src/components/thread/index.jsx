import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from 'src/components/post';
import ExpandedPost from 'src/components/expandedPost';
import AddPost from 'src/components/addPost';
import PropTypes from 'prop-types';
import { loadAllPosts } from './logic/threadActions';

import styles from './thread.module.scss';

class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadAllPosts();
    }

    renderExpandedPost() {
        const { expandedPostId } = this.props;
        if (expandedPostId) {
            const target = document.getElementById('root');
            return ReactDOM.createPortal(<ExpandedPost postId={expandedPostId} />, target);
        }
        return null;
    }

    render() {
        const { posts } = this.props;
        return (
            <div className={styles.root}>
                <div className={styles['add-post-wrapper']}>
                    <AddPost />
                </div>
                <div className={styles['thread-wrapper']}>
                    Posts:
                    <div className={styles.posts}>
                        {posts && posts.map(post => (<Post post={post} key={post.id} />))}
                    </div>
                </div>
                {this.renderExpandedPost()}
            </div>
        );
    }
}

Thread.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    loadAllPosts: PropTypes.func.isRequired,
    expandedPostId: PropTypes.string
};

Thread.defaultProps = {
    posts: [],
    expandedPostId: undefined
};

const mapStateToProps = rootState => ({
    posts: rootState.posts.posts,
    expandedPostId: rootState.posts.expandedPostId
});

const actions = { loadAllPosts };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
