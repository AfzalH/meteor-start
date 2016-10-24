// publications go here
const super_admin_emails = [
    'afzal@srizon.com',
    'afzal.csedu@gmail.com'
]

Meteor.publish('users',function(limit){
    return Meteor.users.find({},{skip:0, limit: limit});
});