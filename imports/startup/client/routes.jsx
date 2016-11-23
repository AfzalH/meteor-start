import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {routeRequireSuperAdmin} from './routeCallbacks';

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
import UserDetail from '../../components/admin/UserDetail';

export const getAppRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/admin" component={Admin} onEnter={routeRequireSuperAdmin}>
            <IndexRoute component={DashBoard} />
            <Route path="users" component={Users} />
            <Route path="user/:id" component={UserDetail} />
        </Route>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="account" component={Account} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
