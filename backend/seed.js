const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@school.com',
        password: 'password123',
        role: 'ADMIN',
      },
      {
        name: 'Teacher One',
        email: 'teacher@school.com',
        password: 'password123',
        role: 'TEACHER',
      },
      {
        name: 'Parent One',
        email: 'parent@school.com',
        password: 'password123',
        role: 'PARENT',
      },
      {
        name: 'Principal User',
        email: 'principal@school.com',
        password: 'password123',
        role: 'PRINCIPAL',
      },
      {
        name: 'Aarav (Student)',
        email: 'student@school.com',
        password: 'password123',
        role: 'STUDENT',
      },
      {
        name: 'Finance Manager',
        email: 'accountant@school.com',
        password: 'password123',
        role: 'ACCOUNTANT',
      },
    ];

    for (const user of users) {
      await User.create(user);
    }
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
