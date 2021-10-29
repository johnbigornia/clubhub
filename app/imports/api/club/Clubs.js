import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Clubs = new Mongo.Collection('Clubs');

/** Define a schema to specify the structure of each document in the collection. */
const ClubsSchema = new SimpleSchema({
  ClubName: String,
  Type: [{ type: String }],
  ContactName: String,
  Email: String,
  Website: {
    type: String,
    optional: true,
    defaultValue: 'N/A',
  },
  Image: {
    type: String,
    defaultValue: 'https://react.semantic-ui.com/images/wireframe/image.png',
    optional: true,
  },
  Description: {
    type: String,
    defaultValue: 'magnus opus change me',
    optional: true,
  },
  RIOEmail: { type: String, optional: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Clubs.attachSchema(ClubsSchema);

/** Make the collection and schema available to other code. */
export { Clubs, ClubsSchema };
