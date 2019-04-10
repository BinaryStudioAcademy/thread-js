import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Thread from '../../components/thread'
import Profile from '../../components/profile'
import Header from '../../components/header'

import styles from './app.module.scss'

const App = () => (
    <div className={styles["root-app"]}>
        <header>
            <Header />
        </header>
        <main>
            <Router>
                <Switch>
                    <Route exact path="/" component={Thread} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </Router>
        </main>
    </div>
)

export default App;
