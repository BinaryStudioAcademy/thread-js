import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Profile = ({ user }) => (
    <div>
        <div>
            <span>username:</span>
            <span>{user.username}</span>
        </div>
        <div>
            <span>email:</span>
            <span>{user.email}</span>
        </div>
    </div>
);

Profile.propTypes = {
    user: PropTypes.objectOf(PropTypes.any)
};

Profile.defaultProps = {
    user: {}
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});


export default connect(
    mapStateToProps
)(Profile);
