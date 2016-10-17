import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import AppContainer from '../../containers/AppContainer';
import HomeContainer from '../../containers/HomeContainer';
import AboutContainer from '../../containers/AboutContainer';
import AccountContainer from '../../containers/AccountContainer';
import NotFound from '../../components/NotFound';

export const getAppRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={HomeContainer} />
            <Route path="about" component={AboutContainer} />
            <Route path="account" component={AccountContainer} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
