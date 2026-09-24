import { Calendar as CalendarIcon, Clock, MapPin, AlertCircle, BookOpen, Users, UserCheck } from 'lucide-react';

export default function TeacherExams() {
  const duties = [
    { 
      id: 1, 
      name: 'Mid-Term Examination 2026', 
      date: 'Dec 10, 2026', 
      time: '09:00 AM - 12:00 PM', 
      class: '10th Grade',
      section: 'A',
      room: 'Main Hall A', 
      subject: 'Mathematics',
      type: 'Invigilation',
      assignedTeacher: 'Mrs. Sharma (Lead)'
    },
    { 
      id: 2, 
      name: 'Mid-Term Examination 2026', 
      date: 'Dec 12, 2026', 
      time: '09:00 AM - 12:00 PM', 
      class: '12th Grade',
      section: 'B',
      room: 'Lab 2', 
      subject: 'Physics Advanced',
      type: 'Subject Expert (On-Call)',
      assignedTeacher: 'Mr. John (Invigilator)'
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exam Duties & Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">Complete details of your assigned examination duties.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center text-amber-700 bg-amber-50 p-4 rounded-xl mb-6 border border-amber-100">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p className="text-sm font-medium">Please report to the examination control room 30 minutes before your scheduled duty time.</p>
        </div>

        <div className="space-y-6">
          {duties.map((duty) => (
            <div key={duty.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-indigo-100 hover:shadow-md transition-all group">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-black text-gray-900">{duty.name}</h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${duty.type === 'Invigilation' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {duty.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm font-bold text-gray-700">
                  <span className="flex items-center"><CalendarIcon className="h-4 w-4 mr-1.5 text-indigo-500" /> {duty.date}</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5 text-indigo-500" /> {duty.time}</span>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Class & Section</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {duty.class} - Sec {duty.section}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                    {duty.subject}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Room / Venue</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {duty.room}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Co-Teacher</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-gray-400" />
                    {duty.assignedTeacher}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
