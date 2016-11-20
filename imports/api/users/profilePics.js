import { FilesCollection } from 'meteor/ostrio:files';

export let profilePics = new FilesCollection({
    collectionName: 'profilepics',
    allowClientCode: false,
    onBeforeUpload(file) {
        if (file.size <= 4194304 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 4MB';
        }
    }
});