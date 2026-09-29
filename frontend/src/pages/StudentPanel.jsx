import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Check, AlertCircle, Megaphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function StudentPanel() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/announcements');
        const filtered = res.data.filter(a => a.targetAudience === 'ALL' || a.targetAudience === 'STUDENTS');
        setAnnouncements(filtered);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };
    fetchAnnouncements();

    const socket = io('http://localhost:5000');
    
    socket.on('new_announcement', (announcement) => {
      if (announcement.targetAudience === 'ALL' || announcement.targetAudience === 'STUDENTS') {
        setAnnouncements((prev) => [announcement, ...prev]);
        
        if (announcement.isUrgent) {
          toast.error(`Urgent: ${announcement.title}`, { duration: 6000 });
        } else {
          toast.success(`New Announcement: ${announcement.title}`, { duration: 4000 });
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const studentInfo = {
    name: user?.name?.split(' ')[0] || 'Aarav',
    class: 'Class 8-A',
    roll: '17',
  };

  const schedule = [
    { time: '08:00', subject: 'Mathematics', room: 'Room 12' },
    { time: '09:00', subject: 'Science', room: 'Lab 2' },
    { time: '10:00', subject: 'English', room: 'Room 12' },
  ];

  const homework = [
    { subject: 'Mathematics', status: 'Due Tomorrow', type: 'pending' },
    { subject: 'Science', status: 'Due 18 Sep', type: 'upcoming' },
    { subject: 'English', status: 'Submitted', type: 'completed' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Greeting Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold flex items-center">
            Good Morning, {studentInfo.name} <span className="ml-2 animate-bounce">👋</span>
          </h1>
          <p className="mt-2 text-indigo-100 font-medium opacity-90">
            {studentInfo.class} &bull; Roll No. {studentInfo.roll}
          </p>
        </div>
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white opacity-10"></div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Attendance</p>
          <p className="text-4xl font-bold text-gray-900">92%</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Avg. Score</p>
          <p className="text-4xl font-bold text-emerald-600">84%</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Fee Status</p>
          <p className="text-4xl font-bold text-rose-500">₹2,500</p>
          <p className="text-xs text-rose-400 mt-1">Pending Due</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Today's Classes</h3>
          </div>
          <ul className="divide-y divide-gray-50">
            {schedule.map((item, idx) => (
              <li key={idx} className="p-5 hover:bg-gray-50/50 transition-colors flex items-center">
                <span className="w-16 text-sm font-bold text-indigo-600">{item.time}</span>
                <span className="flex-1 text-sm font-semibold text-gray-900">{item.subject}</span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.room}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Homework */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Homework</h3>
          </div>
          <ul className="divide-y divide-gray-50">
            {homework.map((item, idx) => (
              <li key={idx} className="p-5 hover:bg-gray-50/50 transition-colors flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">{item.subject}</span>
                <span className="flex items-center text-sm font-medium">
                  {item.type === 'completed' && <Check className="h-4 w-4 text-emerald-500 mr-2" />}
                  {item.type === 'pending' && <AlertCircle className="h-4 w-4 text-rose-500 mr-2" />}
                  {item.type === 'upcoming' && <Clock className="h-4 w-4 text-amber-500 mr-2" />}
                  
                  <span className={
                    item.type === 'completed' ? 'text-emerald-600' :
                    item.type === 'pending' ? 'text-rose-600' : 'text-amber-600'
                  }>
                    {item.status} {item.type === 'completed' ? '✓' : ''}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Megaphone className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">School Announcements</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.length === 0 ? (
            <p className="text-gray-500 text-sm italic col-span-full">No announcements at this time.</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement._id || announcement.id} className={`p-5 rounded-2xl border ${announcement.isUrgent ? 'border-rose-200 bg-rose-50/50' : 'border-gray-100 bg-gray-50/50'} hover:shadow-md transition-shadow relative overflow-hidden group`}>
                {announcement.isUrgent && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
                )}
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${announcement.isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {announcement.type}
                  </span>
                  <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{announcement.date}</span>
                </div>
                <h4 className={`text-base font-bold ${announcement.isUrgent ? 'text-rose-900' : 'text-gray-900'} mb-2 relative z-10`}>{announcement.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed relative z-10">{announcement.message}</p>
                {announcement.attachments && announcement.attachments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200/50">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Attachments:</p>
                    <div className="flex flex-wrap gap-2">
                      {announcement.attachments.map((att, idx) => (
                        <a key={idx} href={att.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 transition-colors">
                          {att.fileName}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
