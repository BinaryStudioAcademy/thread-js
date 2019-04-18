import React from 'react';
import * as postActions from 'src/components/post/logic/postActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './addPost.module.scss';

class AddPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: ''
        };
    }

    handleAddPost = () => {
        this.props.addPost({
            imageId: null,
            body: this.state.post
        })
    }

    render() {
        return <div className={styles["root"]}>
            <textarea onChange={(ev) => this.setState({ post: ev.target.value })}/>
            <button onClick={this.handleAddPost}>Add Post</button>
        </div>
    }
}

const mapStateToProps = (rootState) => {
    return {};
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addPost: postActions.addPost }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost);

