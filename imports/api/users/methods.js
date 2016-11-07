Meteor.methods({
    togglePermission(user_id, permission) {
        let user = Meteor.users.findOne({ _id: user_id });
        if (user.roles && user.roles.indexOf(permission) !== -1) {
            Roles.removeUsersFromRoles(user_id, permission);
        }
        else {
            Roles.addUsersToRoles(user_id, permission);
        }
    }
});