import React from 'react'
import { bindActionCreators } from 'redux'
import * as threadActions from './logic/threadActions';
import { connect } from 'react-redux'

import styles from './thread.module.scss'

const Thread = (props) => (
    <div className={styles["root"]}>
        Thread Component
        <div>
            <button onClick={props.loadAllPosts}>Click on me to run redux action!</button>
            <ul>
                {props.posts && props.posts.map((post, index) =>
                    <li key={index}>{post.toString()}</li>
                )}
            </ul>
        </div>
    </div>
)

const mapStateToProps = (rootState) => {
    return {
        posts: rootState.thread.posts
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(threadActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread)
