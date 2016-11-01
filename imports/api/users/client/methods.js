import _ from 'lodash';
Meteor.methods({
    addNewUserEmail(user_id, email_address) {
        let user = Meteor.users.findOne({ _id: user_id });
        user.registered_emails.push({ 'address': email_address, 'verified': false });
        Meteor.users.update(user._id, { $set: { registered_emails: user.registered_emails } });
    },
    deleteUserEmail(user_id, email_address) {
        let user = Meteor.users.findOne({ _id: user_id });
        _.remove(user.registered_emails, { address: email_address });
        Meteor.users.update(user._id, { $set: { registered_emails: user.registered_emails } });
    }
});