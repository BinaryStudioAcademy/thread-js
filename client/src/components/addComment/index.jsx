import React from 'react';
import { addComment } from 'src/components/post/logic/postActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as imageService from 'src/services/imageService';

import styles from './addComment.module.scss';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            imageId: undefined,
            imageLink: undefined
        };
    }

    handleAddPost = () => {
        this.props.addComment({
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
                Add comment:
                {this.state.imageLink && <img src={this.state.imageLink} alt="post" />}
                <textarea onChange={ev => this.setState({ post: ev.target.value })} />
                <input type="file" onChange={this.loadFile} />
                <button type="button" onClick={this.handleAddPost}>Add Post</button>
            </div>
        );
    }
}

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired
};

const actions = {
    addComment
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    undefined,
    mapDispatchToProps
)(AddComment);
