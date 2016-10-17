import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { getAppRoutes } from '../imports/startup/client/routes';

AccountsTemplates.configure({
    showForgotPasswordLink: true,
    showAddRemoveServices: true
});

Meteor.startup(() => {
    render(getAppRoutes(), document.getElementById('app'));
});

