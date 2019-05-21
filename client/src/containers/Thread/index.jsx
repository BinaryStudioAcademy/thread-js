import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as imageService from 'src/services/imageService';
import ExpandedPost from 'src/containers/ExpandedPost';
import Post from 'src/components/Post';
import AddPost from 'src/components/AddPost';
import { Checkbox } from 'semantic-ui-react';
import { InfiniteLoader, AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { loadPosts, likePost, toggleExpandedPost, addPost } from './actions';

import styles from './styles';
import 'react-virtualized/styles.css';

class Thread extends React.Component {
    cache = new CellMeasurerCache({ defaultHeight: 150, fixedWidth: true });

    constructor(props) {
        super(props);
        this.state = {
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
    }

    uploadImage = file => imageService.uploadImage(file);

    rowRenderer = ({ key, index, style, parent }) => {
        const { posts } = this.props;
        const post = posts[index];
        return post
            ? (
                <CellMeasurer
                    cache={this.cache}
                    columnIndex={0}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                    width={500}
                >
                    <Post
                        style={style}
                        post={post}
                        likePost={this.props.likePost}
                        toggleExpandedPost={this.props.toggleExpandedPost}
                        key={key}
                    />
                </CellMeasurer>
            )
            : <div key={key} style={style}>empty cell</div>;
    };

    renderList = () => {
        const { posts = [] } = this.props;
        return posts && posts.length
            ? (
                <InfiniteLoader
                    isRowLoaded={({ index }) => posts[index]}
                    loadMoreRows={({ startIndex, stopIndex }) => {
                        this.props.loadPosts({
                            ...this.state.postsFilter,
                            from: startIndex,
                            count: stopIndex - startIndex
                        });
                    }}
                    rowCount={999}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    deferredMeasurementCache={this.cache}
                                    ref={registerChild}
                                    height={height}
                                    onRowsRendered={onRowsRendered}
                                    rowCount={999}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.rowRenderer}
                                    width={width}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            )
            : 'NOthing';
    }

    render() {
        const { posts, expandedPostId, ...props } = this.props;
        const { showOwnPosts } = this.state;
        return (
            <div style={styles.threadContent}>
                <div style={styles.threadContent}>
                    <AddPost addPost={props.addPost} uploadImage={this.uploadImage} />
                </div>
                <Checkbox toggle label="Show only my posts" checked={showOwnPosts} onChange={this.tooglePosts} />
                <div style={styles.thread}>
                    {/* {this.renderList()} */}
                    {posts.map(post => (
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
    loadPosts: PropTypes.func.isRequired,
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
