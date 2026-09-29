const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const User = require('./models/User');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
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
      console.log('Test users seeded automatically into DB!');
    }
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
  }
};

connectDB().then(() => {
  seedUsers();
});

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);

app.get('/', (req, res) => {
  res.send('School Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
