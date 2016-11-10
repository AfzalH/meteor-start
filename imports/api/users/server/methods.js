import { HTTP } from 'meteor/http';
import { AccountsEmailsField } from 'meteor/splendido:accounts-emails-field';
import { profilePics } from '../profilePics';
Meteor.methods({
    // methods go here
    getUserCount() {
        // Meteor._sleepForMs(1000);
        return Meteor.users.find().count();
    },
    sendTestEmail(targetemail) {
        Email.send({
            from: 'admin@srizon.com',
            to: targetemail,
            subject: 'Hello World!',
            text: 'This is a test message from the brand new app we are developing',
            html: '<h2>Hello User</h2><p>Here is your text</p>'
        })
    },
    addNewUserEmail(user_id, email_address) {
        Accounts.addEmail(user_id, email_address, false);
        let user = Meteor.users.findOne({ _id: user_id });
        AccountsEmailsField.updateEmails({ user: user });
    },
    deleteUserEmail(user_id, email_address) {
        // Meteor._sleepForMs(3000);
        Accounts.removeEmail(user_id,email_address);
        let user = Meteor.users.findOne({ _id: user_id });
        AccountsEmailsField.updateEmails({ user: user })
    },
    saveUserValue(user_id, key, value) {
        let setval = {};
        if(key == 'username'){
            Accounts.setUsername(user_id,value);
            return;
        }
        setval[key] = value;
        Meteor.users.update(user_id, { $set: setval });
    },
    profilePicUploaded(user_id,file_id){
        let fileObj = profilePics.findOne({_id: file_id})
        let pic = {};
        pic['link'] = fileObj.link();
        pic['id'] = file_id;
        Meteor.users.update(user_id, { $set: {'profile.pic': pic} });
        // console.log(fileObj);
    }
});