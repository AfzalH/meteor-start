import Auth from '../../auth';
Meteor.methods({
    togglePermission(user_id, permission) {
        if(!Auth.isSuperAdmin()) return;
        let user = Meteor.users.findOne({ _id: user_id });
        if (user.roles && user.roles.indexOf(permission) !== -1) {
            Roles.removeUsersFromRoles(user_id, permission);
        }
        else {
            Roles.addUsersToRoles(user_id, permission);
        }
    },
    profilePicSourceChange(user_id, newSource) {
        if(!Auth.isSuperAdminOrSelf(user_id)) return;
        Meteor.users.upsert(user_id, { $set: { 'profile.picSource': newSource } });
    },
    gravatarEmailChanged(user_id, newEmail){
        if(!Auth.isSuperAdminOrSelf(user_id)) return;
        Meteor.users.upsert(user_id, { $set: { 'profile.gravatarEmail': newEmail } });
    }
});