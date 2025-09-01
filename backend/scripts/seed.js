const mongoose = require('mongoose');
const User = require('../modules/user/user.model');
require('dotenv').config();

const seedUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@mintonn.com',
    password: 'Admin123!@#',
    role: 'admin',
    isEmailVerified: true,
    profile: {
      phone: '+1234567890',
      gender: 'male',
      preferences: {
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        language: 'en',
      }
    }
  },
  {
    firstName: 'Moderator',
    lastName: 'User',
    email: 'moderator@mintonn.com',
    password: 'Moderator123!@#',
    role: 'moderator',
    isEmailVerified: true,
    profile: {
      phone: '+1234567891',
      gender: 'female',
      preferences: {
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        language: 'en',
      }
    }
  },
  {
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@mintonn.com',
    password: 'User123!@#',
    role: 'user',
    isEmailVerified: true,
    profile: {
      phone: '+1234567892',
      gender: 'other',
      preferences: {
        notifications: {
          email: true,
          push: false,
          sms: false
        },
        language: 'en',
      }
    }
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create seed users
    const createdUsers = await User.create(seedUsers);
    console.log(`Created ${createdUsers.length} seed users`);

    // Display created users
    createdUsers.forEach(user => {
      console.log(`👤 ${user.role.toUpperCase()}: ${user.email} (${user.fullName})`);
    });

    console.log('\nDatabase seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@mintonn.com / Admin123!@#');
    console.log('Moderator: moderator@mintonn.com / Moderator123!@#');
    console.log('User: user@mintonn.com / User123!@#');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seeding
if (require.main === module) {
  connectDB().then(() => {
    seedDatabase();
  });
}

module.exports = { seedDatabase };
