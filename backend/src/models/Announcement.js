const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Notice', 'Event', 'Urgent', 'Meeting', 'Work Instruction'],
    default: 'Notice'
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    required: true
  },
  targetAudience: {
    type: String,
    enum: ['TEACHERS', 'STUDENTS', 'ALL'],
    default: 'ALL'
  },
  attachments: [{
    fileName: String,
    url: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
