Meteor.methods({
    togglePermission(user_id, permission) {
        let user = Meteor.users.findOne({ _id: user_id });
        if (user.roles && user.roles.indexOf(permission) !== -1) {
            Roles.removeUsersFromRoles(user_id, permission);
        }
        else {
            Roles.addUsersToRoles(user_id, permission);
        }
    },
    profilePicSourceChange(user_id, newSource) {
        Meteor.users.upsert(user_id, { $set: { 'profile.picSource': newSource } });
    },
    gravatarEmailChanged(user_id, newEmail){
        Meteor.users.upsert(user_id, { $set: { 'profile.gravatarEmail': newEmail } });
    }
});