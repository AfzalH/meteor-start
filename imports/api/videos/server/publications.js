// publications go here
const super_admin_emails = [
    'afzal@srizon.com',
    'afzal.csedu@gmail.com'
]

Meteor.publish('users',function(limit){
    // Meteor._sleepForMs(1000);
    return Meteor.users.find({},{limit: limit});
});
