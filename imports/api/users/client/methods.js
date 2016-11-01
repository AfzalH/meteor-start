Meteor.methods({
    addNewUserEmail(targetid, email_address) {
        console.log('hit simulation');
        let user = Meteor.users.findOne({ _id: targetid });
        user.registered_emails.push({ 'address': email_address, 'verified': false });
        Meteor.users.update(user._id, { $set: { registered_emails: user.registered_emails } });
    }
});