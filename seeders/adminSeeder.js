const mongoose = require('mongoose');
const User = require('../models/User');
const DefaultParameter = require('../models/DefaultParameter');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ user_role: 'Admin' });
    
    if (!existingAdmin) {
      // Create admin user
      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@eplan.com',
        password: 'Admin@123',
        user_role: 'Admin'
      });
      console.log('Admin user created:', adminUser.email);
    } else {
      console.log('Admin user already exists');
    }

    // Create default parameters if they don't exist
    const existingParams = await DefaultParameter.findOne();
    if (!existingParams) {
      await DefaultParameter.create({});
      console.log('Default parameters created');
    } else {
      console.log('Default parameters already exist');
    }

    // Create sample enterprise user
    const existingEnterprise = await User.findOne({ user_role: 'Enterprise' });
    if (!existingEnterprise) {
      const enterpriseUser = await User.create({
        name: 'Enterprise User',
        email: 'enterprise@eplan.com',
        password: 'Enterprise@123',
        user_role: 'Enterprise'
      });
      console.log('Enterprise user created:', enterpriseUser.email);
    }

    // Create sample normal user
    const existingNormal = await User.findOne({ user_role: 'Normal' });
    if (!existingNormal) {
      const normalUser = await User.create({
        name: 'Normal User',
        email: 'user@eplan.com',
        password: 'User@123',
        user_role: 'Normal'
      });
      console.log('Normal user created:', normalUser.email);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();