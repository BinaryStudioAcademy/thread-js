import React from 'react';
import { addPost } from 'src/components/post/logic/postActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as imageService from 'src/services/imageService';

import styles from './addPost.module.scss';

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            imageId: undefined,
            imageLink: undefined
        };
    }

    handleAddPost = () => {
        this.props.addPost({
            imageId: this.state.imageId,
            body: this.state.post
        });
    }

    loadFile = async (e) => {
        const { id, link } = await imageService.uploadImage(e.target.files[0]);
        this.setState({
            imageId: id,
            imageLink: link
        });
    }

    render() {
        return (
            <div className={styles.root}>
                Add post:
                {this.state.imageLink && <img src={this.state.imageLink} alt="post" />}
                <textarea onChange={ev => this.setState({ post: ev.target.value })} />
                <input type="file" onChange={this.loadFile} />
                <button type="button" onClick={this.handleAddPost}>Add Post</button>
            </div>
        );
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired
};

const actions = {
    addPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    undefined,
    mapDispatchToProps
)(AddPost);
