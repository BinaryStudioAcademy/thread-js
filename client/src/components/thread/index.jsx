import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from 'src/components/post';
import AddPost from 'src/components/addPost';
import PropTypes from 'prop-types';
import { loadAllPosts } from './logic/threadActions';

import styles from './thread.module.scss';

class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadAllPosts();
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
                        {posts && posts.map(post => <Post key={post.id} post={post} />)}
                    </div>
                </div>
            </div>
        );
    }
}

Thread.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    loadAllPosts: PropTypes.func.isRequired
};

Thread.defaultProps = {
    posts: []
};

const mapStateToProps = rootState => ({
    posts: rootState.posts.posts
});

const actions = { loadAllPosts };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
