import gravatar from 'gravatar';
export const getProfilePicture = function(user){
    if (user.profile) {
        if (user.profile.picSource) {
            if (user.profile.picSource == 'gravatar') {
                if (user.profile.gravatarEmail) {
                    return gravatar.url(user.profile.gravatarEmail, { d: 'mm' });
                }
            }
            else if (user.profile.picSource == 'upload') {
                if (user.profile.pic) {
                    return user.profile.pic.sqthumb || user.profile.pic.link;
                }
            }
            else if (user.profile.picSource == 'facebook') {
                if (user.services && user.services.facebook && user.services.facebook.id) {
                    return "http://graph.facebook.com/" + user.services.facebook.id + "/picture?width=400";
                }

            }
            else if (user.profile.picSource == 'google') {
                if (user.services && user.services.google && user.services.google.picture) {
                    return user.services.google.picture;
                }
            }
        }
    }
    else {
        if (user.registered_emails && user.registered_emails[0] && user.registered_emails[0].address) {
            return gravatar.url(user.registered_emails[0].address, { d: 'mm' });
        }
    }
    return 'http://www.gravatar.com/avatar/fdc10710b6ccaeb0c1c8eda5d08bb88e?d=mm';
}
