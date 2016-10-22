import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// site components
import App from '../../components/App';
import Home from '../../components/Home';
import About from '../../components/About';
import Account from '../../components/Account';
import NotFound from '../../components/NotFound';

// admin components
import Admin from '../../components/admin/Admin';
import DashBoard from '../../components/admin/DashBoard';
import Users from '../../components/admin/Users';

export const getAppRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/admin" component={Admin}>
            <IndexRoute component={DashBoard} />
            <Route path="users" component={Users} />
        </Route>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="account" component={Account} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
