import { CheckCircle2, Clock, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentPanel() {
  const { user } = useAuth();
  
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
    </div>
  );
}
