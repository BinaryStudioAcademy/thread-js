import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from 'src/components/post';
import AddPost from 'src/components/addPost';
import PropTypes from 'prop-types';
import threadActions from './logic/threadActions';

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
                Add post:
                <AddPost />
                Posts:
                <div>
                    {posts && posts.map((post, index) => <Post key={index} post={post} />)}
                </div>
            </div>
        );
    }
}

Thread.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = rootState => ({
    posts: rootState.posts.posts
});

const mapDispatchToProps = dispatch => bindActionCreators(threadActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
