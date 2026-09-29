const Announcement = require('../models/Announcement');

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, type, isUrgent, date, attachments, targetAudience } = req.body;
    const newAnnouncement = await Announcement.create({
      title,
      message,
      type,
      isUrgent,
      date,
      targetAudience: targetAudience || 'ALL',
      attachments,
      createdBy: req.user ? req.user._id : null
    });

    // Emit the event to all connected sockets
    if (req.app.get('io')) {
      req.app.get('io').emit('new_announcement', newAnnouncement);
    }

    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
