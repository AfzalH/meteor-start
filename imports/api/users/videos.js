import { Mongo } from 'meteor/mongo';

export const Videos = new Mongo.Collection('videos');

Videos.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});
