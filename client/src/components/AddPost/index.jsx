import React from 'react';
import { addPost } from 'src/containers/Thread/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Image } from 'semantic-ui-react';
import * as imageService from 'src/services/imageService';

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
        await this.props.addPost({
            imageId: this.state.imageId,
            body: this.state.body
        });
        this.setState(initialState);
    }

    loadFile = async (e) => {
        const { id, link } = await imageService.uploadImage(e.target.files[0]);
        this.setState({
            imageId: id,
            imageLink: link
        });
    }

    render() {
        const { imageLink, body } = this.state;
        return (
            <Form onSubmit={this.handleAddPost}>
                <Form.TextArea placeholder="What is the news?" value={body} onChange={ev => this.setState({ body: ev.target.value })} />
                {imageLink && <Image size="small" src={imageLink} alt="post" />}
                <Button color="teal" icon labelPosition="left" as="label">
                    <Icon name="image" />
                    Attach image
                    <input type="file" onChange={this.loadFile} hidden />
                </Button>
                <Button floated="right" color="blue" type="submit">Post</Button>
            </Form>
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
