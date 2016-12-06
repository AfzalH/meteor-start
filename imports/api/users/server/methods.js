import { HTTP } from 'meteor/http';
import { AccountsEmailsField } from 'meteor/splendido:accounts-emails-field';
import { profilePics } from '../profilePics';
import Jimp from 'jimp';
import Auth from '../../../auth';
import _ from 'lodash';
import sha1 from 'sha1';
Meteor.methods({
    // methods go here
    getUserCount() {
        // Meteor._sleepForMs(1000);
        if (!Auth.isSuperAdmin()) return;
        return Meteor.users.find().count();
    },
    sendTestEmail(targetemail) {
        if (!Auth.isSuperAdmin()) return;
        Email.send({
            from: 'admin@srizon.com',
            to: targetemail,
            subject: 'Hello World!',
            text: 'This is a test message from the brand new app we are developing',
            html: '<h2>Hello User</h2><p>Here is your text</p>'
        })
    },
    addNewUserEmail(user_id, email_address) {
        if (!Auth.isSuperAdminOrSelf(user_id)) return;
        Meteor.users.update({ _id: user_id }, { $push: { emails: { address: email_address, verified: false } } })
        let user = Meteor.users.findOne({ _id: user_id });
        AccountsEmailsField.updateEmails({ user: user });
    },
    deleteUserEmail(user_id, email_address) {
        // Meteor._sleepForMs(3000);
        if (!Auth.isSuperAdminOrSelf(user_id)) return;
        let user = Meteor.users.findOne({ _id: user_id });
        if (user.registered_emails && user.registered_emails.length === 1) {
            throw new Meteor.Error(442, 'Cannot delete the last email address', 'Cannot Delete the last email address for a user');
        }
        Meteor.users.update({ _id: user_id }, { $pull: { emails: { address: email_address } } })

        user = Meteor.users.findOne({ _id: user_id });
        AccountsEmailsField.updateEmails({ user: user });
    },
    saveUserValue(user_id, key, value) {
        if (!Auth.isSuperAdminOrSelf(user_id)) return;
        let setval = {};
        setval[key] = value;
        Meteor.users.update(user_id, { $set: setval });
    },
    profilePicUploaded(user_id, file_id) {
        if (!Auth.isSuperAdminOrSelf(user_id)) return;
        let fileObj = profilePics.findOne({ _id: file_id });
        let user = Meteor.users.findOne({ _id: user_id });
        if (user.profile && user.profile.pic) {
            profilePics.remove({ _id: user.profile.pic.id });
        }
        let pic = {};
        pic['link'] = fileObj.link();
        pic['id'] = file_id;
        Meteor.users.update(user_id, { $set: { 'profile.pic': pic } });
        // console.log(fileObj);
    },
    cropUserImage(user_id, containerData, cropBoxData) {
        if (!Auth.isSuperAdminOrSelf(user_id)) return;
        let user = Meteor.users.findOne(user_id);
        let propic = profilePics.findOne(user.profile.pic.id);
        let sqthumb = propic._storagePath + '/' + propic._id + '_sqthumb' + propic.extensionWithDot;
        Jimp.read(propic.path).then(function (original) {
            original.resize(containerData.width * 2, containerData.height * 2)
                .crop(cropBoxData.left * 2, cropBoxData.top * 2, cropBoxData.width * 2, cropBoxData.height * 2)
                .quality(80)
                .write(sqthumb);
        }).catch(function (err) {
            throw (err);
        });
        profilePics.update(user.profile.pic.id, {
            $set: {
                'versions.sqthumb': {
                    path: sqthumb,
                    type: propic.type,
                    extension: propic.ext
                }
            }
        });
        let fileObj = profilePics.findOne({ _id: user.profile.pic.id });
        let sqlink = fileObj.link('sqthumb') + '?v=' + Math.random() * 1000;
        Meteor.users.update(user_id, { $set: { 'profile.pic.sqthumb': sqlink } });
    },
    sendEmailVerificationEmail(email) {
        const d = new Date();
        const plain = Meteor.userId() + email + 'woejf28238jfg978y233' + d.getFullYear() + d.getMonth() + d.getDate() + d.getUTCHours();
        const hash = sha1(plain);
        const link = Meteor.absoluteUrl() + 'verifyemail/' + Meteor.userId() + '/' + email + '/' + hash
        const text = "Click the following link to verify your email address: \n" + link + "\n This link will expire at the beginning of the next hour";
        const html = '<p>Click the following link to verify your email address</p> <a href="' + link + '">' + link + '</a>' + '<p>This link will expire at the beginning of the next hour</p>';
        Email.send({
            from: 'admin@srizon.com',
            to: email,
            subject: 'Email Verification Link',
            text: text,
            html: html
        })
    },
    verifyEmail(userid, email, hash) {
        // Meteor._sleepForMs(3000);
        const d = new Date();
        const plain = userid + email + 'woejf28238jfg978y233' + d.getFullYear() + d.getMonth() + d.getDate() + d.getUTCHours();;
        const new_hash = sha1(plain);
        if (new_hash == hash) {
            Meteor.users.update({ _id: userid, 'emails.address' : email }, { $set: { 'emails.$.verified': true } });
            const user = Meteor.users.findOne({ _id: userid });
            AccountsEmailsField.updateEmails({ user: user });
            return true;
        }
        else {
            throw new Meteor.Error(433, 'Cannot Verify email with this link', 'Cannot Verify email with this link, Maybe the link is broken');
        }
    }
});