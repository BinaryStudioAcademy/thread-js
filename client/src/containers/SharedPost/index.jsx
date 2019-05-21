import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { toggleExpandedPost } from 'src/containers/Thread/actions';

class SharedPost extends React.Component {
    async componentDidMount() {
        const { match } = this.props;
        this.props.toggleExpandedPost(match.params.postHash);
    }


    render() {
        return <Redirect to="/" />;
    }
}
SharedPost.propTypes = {
    match: PropTypes.objectOf(PropTypes.any),
    toggleExpandedPost: PropTypes.func.isRequired
};

SharedPost.defaultProps = {
    match: undefined
};

const actions = { toggleExpandedPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(SharedPost);
