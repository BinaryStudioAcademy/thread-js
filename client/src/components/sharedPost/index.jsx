import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Post from 'src/components/post';
import Spinner from 'src/components/common/spinner';
import { getPostByHash } from 'src/components/post/logic/postActions';

class SharedPost extends React.Component {
    async componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { postHash } = params;
        console.log(postHash);
        this.props.getPostByHash('b91ff172-6967-4c09-9c01-f5c0520260fe'); // todo: send real hash, not post id
    }


    render() {
        const { post } = this.props;
        return post
            ? <Post post={post} key={post.id} />
            : <Spinner />;
    }
}
SharedPost.propTypes = {
    match: PropTypes.objectOf(PropTypes.any),
    getPostByHash: PropTypes.func.isRequired,
    post: PropTypes.objectOf(PropTypes.any)
};

SharedPost.defaultProps = {
    match: undefined,
    post: undefined
};


const mapStateToProps = rootState => ({
    post: rootState.posts.sharedPost
});

const actions = { getPostByHash };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedPost);
