# Meteor Start - Startup code for quickly doing a Meteor+ReactJS project
Perfect codebase for starting your next Meteor + ReactJS project.
Just install (instructions below) and Get Meteor + ReactJS + ReactRouter + Accounts + UserRoles + Materialize CSS + Meterialize Admin Template

First User to register will automatically gain the Super Admin previledge and see an additional Admin Menu. Right Now the admin menu shows only user management module.


## User module
Probably the most important module/part of any web project. I've tried to make it look nice and user friendly.
Right now users can register using facebook or google or other email address.
After registering and logging in, user can add remove facebook or google account (unless it's the last account).
Users can edit their name and username. User can add multiple email addresses and verify them.

### Profile picture
User can choose among Gravatar (with any of his/her emails), Upload (crop/resize included), Facebook or Google image 
The upload part is also an example of using the file system and uploading images/files and processing them using meteor+react in a reactive way

### Roles/Permissions
Super Admin can assign a user different roles from the backend. Roles can be re-defined in permissions.js file and some logic/function for checking the roles can be re-defined in auth.js file by taking the existing definition as example.

### Other Features
Admin can also search the user by name or email. The code related to that can be used as an example for implementing other filter/search feature using meteor + reactjs 

## Installation
```
npm install
meteor
```
## System Email Configuration
By default it will print out the email on server console.
For sending emails properly, you need to configure the MAIL_URL evironment variable as recommended by meteor docs.
Also you can rename the email.example.js as email.js inside folder imports/startup/server and put in your smtp credentials. and uncomment the server/main.js file's import for the mail.js file