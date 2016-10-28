import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({
    requestPermissions: {
        facebook: ['public_profile','email','user_photos','user_likes','user_events']
    }
});