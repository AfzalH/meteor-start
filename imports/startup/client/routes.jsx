import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from '../../components/App';
import Home from '../../components/Home';
import About from '../../components/About';
import Account from '../../components/Account';
import NotFound from '../../components/NotFound';
import Admin from '../../components/admin/Admin';

export const getAppRoutes = () => (
    <Router history={browserHistory}>
        <Route path="admin" component={Admin} />
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="account" component={Account} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
