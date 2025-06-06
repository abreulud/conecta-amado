import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Set email sending (for development)
process.env.MAIL_URL = Meteor.settings.MAIL_URL; // Configure in settings.json

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false
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
    }
  };
});

Meteor.startup(() => {
  if(!Meteor.users.findOneAsync({'profile.isAdmin': true})){
    Accounts.createUser({
      email: 'admin@example.com',
      password: 'tempPassword123',
      profile: {
        name: 'Admin',
        isAdmin: true
      }
    });
  }

  Accounts.emailTemplates.resetPassword = {
    subject() {
      return 'Reset your password';
    },
    text(user, url) {
      return `Click this link to reset your password: ${url}`;
    }
  };
});