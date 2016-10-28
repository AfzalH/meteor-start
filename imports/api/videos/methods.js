import {HTTP} from 'meteor/http';

Meteor.methods({
    // methods go here
    getUserCount(){
        // Meteor._sleepForMs(1000);
        return Meteor.users.find().count();
    }
});