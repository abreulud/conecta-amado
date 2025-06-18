import { Meteor } from 'meteor/meteor';
import { Bookings } from '../bookings';

Meteor.publish('bookings', function () {
  return Bookings.find();
});
