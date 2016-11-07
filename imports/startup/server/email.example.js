Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://username:password@mailtrap.io:25';
    // process.env.MAIL_URL = 'smtp://username:password@smtp.mailgun.org:25';
});
