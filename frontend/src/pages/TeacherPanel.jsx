import { useState, useEffect } from 'react';
import { Clock, Users, BookOpen, PenTool, ClipboardCheck, Megaphone } from 'lucide-react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function TeacherPanel() {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch initial announcements
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/announcements');
        const filtered = res.data.filter(a => a.targetAudience === 'ALL' || a.targetAudience === 'TEACHERS');
        setAnnouncements(filtered);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };
    fetchAnnouncements();

    // Socket.io connection
    const socket = io('http://localhost:5000');
    
    socket.on('new_announcement', (announcement) => {
      if (announcement.targetAudience === 'ALL' || announcement.targetAudience === 'TEACHERS') {
        setAnnouncements((prev) => [announcement, ...prev]);
        
        // Show notification
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

  const classes = [
    { id: 1, name: 'Mathematics 101', time: '09:00 AM - 10:30 AM', students: 35, room: 'Room 302' },
    { id: 2, name: 'Physics Advanced', time: '11:00 AM - 12:30 PM', students: 28, room: 'Lab 2' },
    { id: 3, name: 'Computer Science', time: '01:30 PM - 03:00 PM', students: 40, room: 'Lab 1' },
  ];

  const allTasks = [
    { id: 1, title: 'Grade Physics Midterms', desc: 'Due in 2 days', isUrgent: false },
    { id: 2, title: 'Approve Student Leaves', desc: '3 pending requests', isUrgent: true },
    { id: 3, title: 'Upload Study Material', desc: 'For Computer Science class', isUrgent: false },
    { id: 4, title: 'Prepare Math Quiz', desc: 'Due tomorrow', isUrgent: true },
    { id: 5, title: 'Submit Weekly Report', desc: 'Due in 3 days', isUrgent: false },
    { id: 6, title: 'Update Attendance Records', desc: 'For last week', isUrgent: false },
  ];

  const displayedTasks = showAllTasks ? allTasks : allTasks.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your academic operations and daily tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
          <div className="bg-indigo-500 p-4 rounded-xl text-white mr-5 shadow-inner">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">103</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
          <div className="bg-emerald-500 p-4 rounded-xl text-white mr-5 shadow-inner">
            <PenTool className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Grading</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
          <div className="bg-rose-500 p-4 rounded-xl text-white mr-5 shadow-inner">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Leave Requests</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Full Timetable</button>
          </div>
          <ul className="divide-y divide-gray-100">
            {classes.map((cls) => (
              <li key={cls.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="bg-indigo-50 p-3 rounded-xl">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{cls.name}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-xs font-medium text-gray-500">
                        <Clock className="mr-1.5 h-3.5 w-3.5" /> {cls.time}
                      </span>
                      <span className="flex items-center text-xs font-medium text-gray-500">
                        <Users className="mr-1.5 h-3.5 w-3.5" /> {cls.students} Students
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    {cls.room}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h3>
           <div className={`space-y-4 flex-1 ${showAllTasks ? 'overflow-y-auto max-h-[400px] pr-2' : ''}`}>
             {displayedTasks.map((task) => (
               <div key={task.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                 <p className="text-sm font-bold text-gray-900">{task.title}</p>
                 <p className={`text-xs mt-1 ${task.isUrgent ? 'text-rose-500' : 'text-gray-500'}`}>{task.desc}</p>
               </div>
             ))}
           </div>
           <button 
             onClick={() => setShowAllTasks(!showAllTasks)}
             className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
           >
             {showAllTasks ? 'View Less' : 'View All Tasks'}
           </button>
        </div>
      </div>

      {/* Principal Announcements Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Megaphone className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Principal Announcements</h3>
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
