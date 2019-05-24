import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
    }

    handleAddComment = async () => {
        const { body } = this.state;
        if (!body) {
            return;
        }
        const { postId } = this.props;
        await this.props.addComment({ postId, body });
        this.setState({ body: '' });
    }

    render() {
        const { body } = this.state;
        return (
            <Form reply onSubmit={this.handleAddComment}>
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

export default AddComment;
