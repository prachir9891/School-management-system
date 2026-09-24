const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const seedUsers = async () => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const users = [
        { name: 'Admin User', email: 'admin@school.com', password: 'password123', role: 'ADMIN' },
        { name: 'Teacher One', email: 'teacher@school.com', password: 'password123', role: 'TEACHER' },
        { name: 'Parent One', email: 'parent@school.com', password: 'password123', role: 'PARENT' },
        { name: 'Principal User', email: 'principal@school.com', password: 'password123', role: 'PRINCIPAL' },
        { 
          name: 'Aarav (Student)', 
          email: 'student@school.com', 
          password: 'password123', 
          role: 'STUDENT',
          studentDetails: {
            studentId: 'STU-2023-001',
            class: '10th',
            section: 'A',
            dateOfBirth: new Date('2007-05-15'),
            gender: 'Male',
            parentName: 'Ramesh (Father)',
            parentContact: '+91 98765 43210',
            contactNumber: '+91 87654 32109',
            address: '123, School Lane, Mumbai',
            admissionDate: new Date('2023-06-01'),
            photoUrl: 'https://ui-avatars.com/api/?name=Aarav&background=random'
          }
        },
        { name: 'Finance Manager', email: 'accountant@school.com', password: 'password123', role: 'ACCOUNTANT' },
      ];
      for (const user of users) {
        await User.create(user);
      }
      console.log('Test users seeded automatically into memory DB!');
    }
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
  }
};

connectDB().then(() => {
  seedUsers();
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('School Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
