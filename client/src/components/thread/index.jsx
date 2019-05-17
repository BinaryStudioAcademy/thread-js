import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from 'src/components/post';
import ExpandedPost from 'src/components/expandedPost';
import AddPost from 'src/components/addPost';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { loadAllPosts } from './logic/threadActions';
import { getFilteredPosts } from './logic/threadHelper';

class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadAllPosts();
        this.state = {
            postsType: 'all'
        };
    }

    renderExpandedPost = () => {
        const { expandedPostId } = this.props;
        if (expandedPostId) {
            const target = document.getElementById('root');
            return ReactDOM.createPortal(<ExpandedPost postId={expandedPostId} />, target);
        }
        return null;
    }

    showPosts = (type) => {
        this.setState({
            postsType: type
        });
    }

    render() {
        const { posts = [], userId } = this.props;
        const { postsType } = this.state;
        const filteredPosts = getFilteredPosts({ posts, postsType, currentUserId: userId });
        return (
            <div>
                <div>
                    <AddPost />
                </div>
                <div>
                    Posts:
                    <div onClick={() => this.showPosts('mine')}>Mine Posts</div>
                    <div onClick={() => this.showPosts('all')}>All Posts</div>
                    <Grid centered>
                        <Grid.Column style={{ width: 'auto' }}>
                            {filteredPosts.map(post => (
                                <Post post={post} key={post.id} />
                            ))}
                        </Grid.Column>
                    </Grid>
                </div>
                {this.renderExpandedPost()}
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

const actions = { loadAllPosts };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
