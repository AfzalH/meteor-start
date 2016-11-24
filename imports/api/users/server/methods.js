import { HTTP } from 'meteor/http';
import { AccountsEmailsField } from 'meteor/splendido:accounts-emails-field';
import { profilePics } from '../profilePics';
import Jimp from 'jimp';
Meteor.methods({
    // methods go here
    getUserCount() {
        // Meteor._sleepForMs(1000);
        return Meteor.users.find().count();
    },
    sendTestEmail(targetemail) {
        Email.send({
            from: 'admin@srizon.com',
            to: targetemail,
            subject: 'Hello World!',
            text: 'This is a test message from the brand new app we are developing',
            html: '<h2>Hello User</h2><p>Here is your text</p>'
        })
    },
    addNewUserEmail(user_id, email_address) {
        Accounts.addEmail(user_id, email_address, false);
        let user = Meteor.users.findOne({ _id: user_id });
        AccountsEmailsField.updateEmails({ user: user });
    },
    deleteUserEmail(user_id, email_address) {
        // Meteor._sleepForMs(3000);
        let user = Meteor.users.findOne({ _id: user_id });
        if(user.registered_emails && user.registered_emails.length === 1){
            throw new Meteor.Error(442,'Cannot delete the last email address', 'Cannot Delete the last email address for a user');
        }
        Accounts.removeEmail(user_id, email_address);
        user = Meteor.users.findOne({ _id: user_id });
        AccountsEmailsField.updateEmails({ user: user })
    },
    saveUserValue(user_id, key, value) {
        let setval = {};
        if (key == 'username') {
            Accounts.setUsername(user_id, value);
            return;
        }
        setval[key] = value;
        Meteor.users.update(user_id, { $set: setval });
    },
    profilePicUploaded(user_id, file_id) {
        let fileObj = profilePics.findOne({ _id: file_id });
        let user = Meteor.users.findOne({ _id: user_id });
        if(user.profile && user.profile.pic){
            profilePics.remove({_id: user.profile.pic.id});
        }
        let pic = {};
        pic['link'] = fileObj.link();
        pic['id'] = file_id;
        Meteor.users.update(user_id, { $set: { 'profile.pic': pic } });
        // console.log(fileObj);
    },
    cropUserImage(user_id, containerData, cropBoxData) {
        let user = Meteor.users.findOne(user_id);
        let propic = profilePics.findOne(user.profile.pic.id);
        let sqthumb = propic._storagePath + '/' + propic._id + '_sqthumb' + propic.extensionWithDot;
        Jimp.read(propic.path).then(function (original) {
            original.resize(containerData.width*2, containerData.height*2)
                .crop(cropBoxData.left*2, cropBoxData.top*2, cropBoxData.width*2, cropBoxData.height*2)
                .quality(80)
                .write(sqthumb);
        }).catch(function (err) {
            throw(err);
        });
        profilePics.update(user.profile.pic.id,{$set:{
            'versions.sqthumb':{
                path: sqthumb,
                type: propic.type,
                extension: propic.ext
            }
        }});
        let fileObj = profilePics.findOne({ _id: user.profile.pic.id });
        let sqlink = fileObj.link('sqthumb')+'?v='+Math.random()*1000;
        Meteor.users.update(user_id, { $set: { 'profile.pic.sqthumb': sqlink } });
    },
    sendEmailVerificationEmail(email){
        Accounts.sendVerificationEmail(Meteor.userId(),email);
    }
});