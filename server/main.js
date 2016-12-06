import Faker from 'faker';
import '../imports/api/users/methods.js';
import '../imports/api/users/server/methods.js';
import '../imports/api/users/server/publications.js';
import '../imports/startup/both/index.js';
import '../imports/startup/server/onCreateUser';

// for sending email properly, rename the email.example.js as email.js inside folder imports/startup/server and put in your smtp credentials
import '../imports/startup/server/email';

Meteor.startup(() => {
    // populate_user_table(50);
});

function populate_user_table(count) {
    console.log('creating '+ count +' users...');
    for (i = 0; i < count; i++) {
        let first_name = Faker.name.firstName();
        let last_name = Faker.name.lastName();
        let username = Faker.internet.userName(first_name, last_name);
        let name = Faker.name.findName(first_name, last_name);
        let email1 = Faker.internet.email(first_name, last_name);
        let email2 = Faker.internet.email(first_name, last_name, Faker.internet.domainName());
        let email1v = Faker.random.boolean();
        let email2v = Faker.random.boolean();
        let retval = Accounts.createUser({
            username: username,
            createdAt: Faker.date.past(3),
        });
        Meteor.users.upsert(retval, {
            $set: {
                'profile.name': name,
                'registered_emails':[
                    {
                        address: email1,
                        verified: email1v
                    },
                    {
                        address: email2,
                        verified: email2v
                    }
                ]
            }
        });
        Accounts.setPassword(retval, 'password');
        Accounts.addEmail(retval, email1, email1v);
        Accounts.addEmail(retval, email2, email2v);
    }
    console.log('user creation complete!');
}
