import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Image } from 'semantic-ui-react';

const initialState = {
    body: '',
    imageId: undefined,
    imageLink: undefined
};

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
    }

    handleAddPost = async () => {
        const { imageId, body } = this.state;
        await this.props.addPost({ imageId, body });
        this.setState(initialState);
    }

    handleUploadFile = async (e) => {
        const { id: imageId, link: imageLink } = await this.props.uploadImage(e.target.files[0]);
        this.setState({ imageId, imageLink });
    }

    render() {
        const { imageLink, body } = this.state;
        return (
            <Form onSubmit={this.handleAddPost}>
                <Form.TextArea
                    name="body"
                    value={body}
                    placeholder="What is the news?"
                    onChange={ev => this.setState({ body: ev.target.value })}
                />
                {imageLink && <Image size="small" src={imageLink} alt="post" />}
                <Button color="teal" icon labelPosition="left" as="label">
                    <Icon name="image" />
                    Attach image
                    <input name="image" type="file" onChange={this.handleUploadFile} hidden />
                </Button>
                <Button floated="right" color="blue" type="submit">Post</Button>
            </Form>
        );
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

export default AddPost;
