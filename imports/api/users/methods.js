import {HTTP} from 'meteor/http';

Meteor.methods({
    // methods go here
    getUserCount(){
        // Meteor._sleepForMs(1000);
        return Meteor.users.find().count();
    },
    sendTestEmail(targetemail){
        Email.send({
            from: 'admin@srizon.com',
            to: targetemail,
            subject: 'Hello World!',
            text: 'This is a test message from the brand new app we are developing',
            html: '<h2>Hello User</h2><p>Here is your text</p>'
        })
    }
});