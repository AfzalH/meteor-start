import { render } from 'react-dom';
import { getAppRoutes } from '../imports/startup/client/routes';

AccountsTemplates.configure({
    showForgotPasswordLink: true,
    showAddRemoveServices: true,
    focusFirstInput: false
});

Meteor.startup(() => {
    render(getAppRoutes(), document.getElementById('app'));
});

