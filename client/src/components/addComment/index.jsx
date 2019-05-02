import React from 'react';
import { addComment } from 'src/components/post/logic/postActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './addComment.module.scss';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    handleAddPost = () => {
        this.props.addComment({
            body: this.state.comment
        });
    }

    render() {
        return (
            <div className={styles.root}>
                Add comment:
                <textarea onChange={ev => this.setState({ comment: ev.target.value })} />
                <button type="button" onClick={this.handleAddPost}>Add Comment</button>
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
