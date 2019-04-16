import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Thread from 'src/components/thread';
import Profile from 'src/components/profile';
import Header from 'src/components/header';
import Login from 'src/components/login';
import PrivateRoute from 'src/containers/privateRoute';

import styles from './app.module.scss';

const App = () => (
    <div className={styles["root-app"]}>
        <header>
            <Header />
        </header>
        <main>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Thread} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                </Switch>
            </Router>
        </main>
    </div>
)

export default App;
