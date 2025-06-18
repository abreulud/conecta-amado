import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/bookings/server/publications.js';
import '../imports/api/bookings/methods.js';
import '../imports/api/services/server/publications.js';
import '../imports/api/services/methods.js';

// Set email sending (for development)
process.env.MAIL_URL = Meteor.settings.MAIL_URL; // Configure in settings.json

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false,
});

Accounts.onCreateUser((options, user) => {
  return {
    ...user,
    profile: {
      ...options.profile,
      name: options.profile?.name || '',
      isAdmin: options.profile?.isAdmin || false,
      isVerified: options.profile?.isVerified || false,
      createdAt: new Date(),
    },
  };
});

async function createMockAdminUser() {
  try {
    const existingAdmin = await Meteor.users.findOneAsync({
      'profile.isAdmin': true,
    });

    if (!existingAdmin) {
      const userId = Accounts.createUser({
        email: 'admin@example.com',
        password: 'tempPassword123',
        profile: {
          name: 'Admin',
          isAdmin: true,
          isVerified: true,
          createdAt: new Date(),
        },
      });

      console.log(`✅ Mock admin user created with ID: ${userId}`);
    } else {
      console.log('🟦 Admin user already exists.');
    }
  } catch (error) {
    console.error('❌ Error checking/creating admin user:', error);
  }
}

Meteor.startup(() => {
  createMockAdminUser();

  Accounts.emailTemplates.resetPassword = {
    subject() {
      return 'Reset your password';
    },
    text(user, url) {
      return `Click this link to reset your password: ${url}`;
    },
  };
});
