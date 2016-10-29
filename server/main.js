import '../imports/api/users/server/methods.js';
import '../imports/api/users/server/publications.js';
import Faker from 'faker';
import '../imports/startup/both/index.js';

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://7eb6c1a8948372:94ca6dfec1d76a@mailtrap.io:25';
    // process.env.MAIL_URL = 'smtp://postmaster@mg.srizon.com:49bde4927fda68abb011a04f0719ab19@smtp.mailgun.org:25';
    // populate_user_table(15);
});

function populate_user_table(count) {
    for (i = 0; i < count; i++) {
        let first_name = Faker.name.firstName();
        let last_name = Faker.name.lastName();
        let username = Faker.internet.userName(first_name, last_name);
        let name = Faker.name.findName(first_name, last_name);
        let email1 = Faker.internet.email(first_name, last_name);
        let email2 = Faker.internet.email(first_name, last_name, Faker.internet.domainName());
        let retval = Accounts.createUser({
            username: username,
            createdAt: Faker.date.past(3),
            profile: {
                name: name
            },
        });
        Accounts.setPassword(retval, 'newpass');
        Accounts.addEmail(retval, email1, Faker.random.boolean());
        Accounts.addEmail(retval, email2, Faker.random.boolean());
    }
}

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