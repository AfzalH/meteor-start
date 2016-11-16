Accounts.onCreateUser(function(options, user) {
    // make first user super admin
    if(Meteor.users.find().count() == 0){
        user['roles'] = ['super_admin'];
    }
    return user;
});
