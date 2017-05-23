import { Meteor } from 'meteor/meteor';
import fabricObjects from '../lib/fabric-objects'

Meteor.publish({
  fabricObjects() {
    return fabricObjects.find();
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});
