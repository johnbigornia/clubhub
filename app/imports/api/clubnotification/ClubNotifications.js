import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ClubNotifications = new Mongo.Collection('ClubNotifications');

/** Define a schema to specify the structure of each document in the collection. */
const ClubNotificationsSchema = new SimpleSchema({
  notification: String,
  clubid: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ClubNotifications.attachSchema(ClubNotificationsSchema);

/** Make the collection and schema available to other code. */
export { ClubNotifications, ClubNotificationsSchema };
