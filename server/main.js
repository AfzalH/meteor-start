import Faker from 'faker';
import '../imports/api/users/methods.js';
import '../imports/api/users/server/methods.js';
import '../imports/api/users/server/publications.js';
import '../imports/startup/both/index.js';
import '../imports/startup/server/onCreateUser';

Meteor.startup(() => {
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
