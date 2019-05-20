import React from 'react';
import { addComment } from 'src/containers/Thread/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
    }

    handleAddPost = async () => {
        await this.props.addComment({
            postId: this.props.postId,
            body: this.state.body
        });
        this.setState({ body: '' });
    }

    render() {
        const { body } = this.state;
        return (
            <Form reply onSubmit={this.handleAddPost}>
                <Form.TextArea
                    value={body}
                    placeholder="Type a comment..."
                    onChange={ev => this.setState({ body: ev.target.value })}
                />
                <Button type="submit" content="Post comment" labelPosition="left" icon="edit" primary />
            </Form>
        );
    }
}

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
};

const actions = {
    addComment
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    undefined,
    mapDispatchToProps
)(AddComment);
