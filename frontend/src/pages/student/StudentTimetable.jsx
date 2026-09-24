import { Clock, Calendar as CalendarIcon, MapPin } from 'lucide-react';

export default function StudentTimetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    { time: '08:00 AM - 08:45 AM', type: 'Class' },
    { time: '08:45 AM - 09:30 AM', type: 'Class' },
    { time: '09:30 AM - 10:15 AM', type: 'Class' },
    { time: '10:15 AM - 10:45 AM', type: 'Break' },
    { time: '10:45 AM - 11:30 AM', type: 'Class' },
    { time: '11:30 AM - 12:15 PM', type: 'Class' },
  ];

  const schedule = {
    'Monday': ['Mathematics', 'Physics', 'English', 'Break', 'Chemistry', 'Computer Sc.'],
    'Tuesday': ['Physics', 'Chemistry', 'Mathematics', 'Break', 'English', 'Physical Ed.'],
    'Wednesday': ['Chemistry', 'Mathematics', 'Physics', 'Break', 'Computer Sc.', 'Library'],
    'Thursday': ['English', 'Physics', 'Chemistry', 'Break', 'Mathematics', 'Lab'],
    'Friday': ['Computer Sc.', 'English', 'Mathematics', 'Break', 'Physics', 'Chemistry'],
  };

  const getSubjectColor = (subject) => {
    switch(subject) {
      case 'Mathematics': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Physics': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Chemistry': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'English': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Computer Sc.': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      case 'Break': return 'bg-gray-100 text-gray-500 border-gray-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Timetable</h1>
          <p className="text-sm text-gray-500 mt-1">Your weekly class schedule.</p>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <CalendarIcon className="h-4 w-4 mr-2 text-indigo-500" />
          Term 1 (2026-27)
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-40">
                  Day
                </th>
                {timeSlots.map((slot, index) => (
                  <th key={index} scope="col" className="px-4 py-4 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-center">{slot.time}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {days.map((day) => (
                <tr key={day} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-100 bg-gray-50/30">
                    <div className="flex items-center text-sm font-bold text-gray-800">
                      {day}
                    </div>
                  </td>
                  {timeSlots.map((slot, index) => {
                    const subject = schedule[day][index];
                    return (
                      <td key={index} className="px-2 py-3 text-center">
                        <div className={`p-3 rounded-xl border flex flex-col items-center justify-center min-h-[4.5rem] transition-all hover:scale-105 cursor-pointer shadow-sm ${getSubjectColor(subject)}`}>
                          <span className="font-bold text-sm text-center">{subject}</span>
                          {subject !== 'Break' && (
                            <span className="text-[10px] font-medium mt-1 flex items-center justify-center opacity-80">
                              <MapPin className="h-3 w-3 mr-0.5" /> Room {101 + index}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
