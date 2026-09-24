const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'TEACHER', 'PARENT', 'PRINCIPAL', 'STUDENT', 'ACCOUNTANT'],
      required: true,
    },
    studentDetails: {
      studentId: String,
      class: String,
      section: String,
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
      },
      parentName: String,
      parentContact: String,
      contactNumber: String,
      address: String,
      admissionDate: Date,
      photoUrl: String,
    },
    teacherDetails: {
      employeeId: String,
      department: String,
      subjects: [String],
      classTeacher: String,
      joinDate: Date,
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
      },
      contactNumber: String,
      address: String,
      photoUrl: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
