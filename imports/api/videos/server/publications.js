// publications go here
const super_admin_emails = [
    'afzal@srizon.com',
    'afzal.csedu@gmail.com'
]

Meteor.publish('users2',function(){
    return Meteor.users.find({});
});