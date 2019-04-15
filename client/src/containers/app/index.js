import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Thread from 'src/components/thread'
import Profile from 'src/components/profile'
import Header from 'src/components/header'
import Login from 'src/components/login'

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
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </Router>
        </main>
    </div>
)

export default App;
