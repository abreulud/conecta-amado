// imports/api/bookings/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Bookings } from './bookings';

console.log('bookings.methods.js loaded');

Meteor.methods({
  async 'bookings.insert'({ name, serviceId, date, time }) {
    check(name, String);
    check(serviceId, String);
    check(date, String); // ISO format e.g. "2025-06-17"
    check(time, String); // Format like "9:30 AM"

    console.log('Calling bookings.insert with:', {
      name,
      serviceId,
      date,
      time,
    });

    try {
      const bookingId = await Bookings.insertAsync({
        name,
        serviceId,
        date,
        time,
        createdAt: new Date(),
      });

      console.log(`✅ Booking inserted with ID: ${bookingId}`);
      return bookingId;
    } catch (error) {
      console.error('❌ Error inserting booking:', error);
      throw new Meteor.Error(
        'insert-failed',
        'Falha ao inserir o agendamento.'
      );
    }
  },
});
