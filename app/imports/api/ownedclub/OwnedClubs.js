import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const OwnedClubs = new Mongo.Collection('OwnedClubs');

/** Define a schema to specify the structure of each document in the collection. */
const OwnedClubsSchema = new SimpleSchema({
  clubName: String,
  type: [{type: String}],
  contactName: String,
  email: String,
  website: {
    type: String,
    optional: true,
    defaultValue: 'N/A',
  },
  image: {
    type: String,
    defaultValue: 'https://react.semantic-ui.com/images/wireframe/image.png',
    optional: true,
  },
  description: {
    type: String,
    defaultValue: 'magnus opus change me',
    optional: true,
  },
  rioemail: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
OwnedClubs.attachSchema(OwnedClubsSchema);

/** Make the collection and schema available to other code. */
export { OwnedClubs, OwnedClubsSchema };