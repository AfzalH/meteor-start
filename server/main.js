import '../imports/api/videos/methods.js';
import '../imports/api/videos/server/publications.js';
AccountsTemplates.configure({
    showForgotPasswordLink: true,
    showAddRemoveServices: true
});
Meteor.startup(() => {

});

/*
{
    "service" : "facebook",
    "appId" : "1637289416591017",
    "secret" : "475d495aca56adf5cb36945e78b79a61",
}

{
    "service" : "google",
    "clientId" : "286502980229-af11qd3ra708cml17m5m7f65k5tf29vc.apps.googleusercontent.com",
    "secret" : "YIBKSeioFTzLpvT5Vz-XLSDE",
}
*/