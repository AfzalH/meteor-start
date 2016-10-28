import { render } from 'react-dom';
import { getAppRoutes } from '../imports/startup/client/routes';
import '../imports/startup/both/index.js';
import '../imports/startup/client/accounts.js';

Meteor.startup(() => {
    render(getAppRoutes(), document.getElementById('app'));
});

