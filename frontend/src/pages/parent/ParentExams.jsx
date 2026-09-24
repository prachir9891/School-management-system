import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function ParentExams() {
  const [selectedChild, setSelectedChild] = useState('Aarav Patel');

  const exams = [
    { id: 1, name: 'Mid-Term Examination', subject: 'Mathematics', date: 'Dec 10, 2026', time: '09:00 AM - 12:00 PM', room: 'Main Hall', syllabus: 'Chapters 1, 2, and 3' },
    { id: 2, name: 'Mid-Term Examination', subject: 'Physics', date: 'Dec 12, 2026', time: '09:00 AM - 12:00 PM', room: 'Lab 2', syllabus: 'Chapters 1 to 4' },
    { id: 3, name: 'Mid-Term Examination', subject: 'English', date: 'Dec 15, 2026', time: '09:00 AM - 11:30 AM', room: 'Room 102', syllabus: 'Grammar and Prose Section A' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Timetables and syllabus coverage for upcoming examinations.</p>
        </div>
        <select 
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 font-semibold shadow-sm"
        >
          <option value="Aarav Patel">👦 Aarav Patel (10-A)</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center text-indigo-700 bg-indigo-50 p-4 rounded-xl mb-6 border border-indigo-100">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p className="text-sm font-medium">Please ensure your child reports to the examination hall 30 minutes prior to the start time.</p>
        </div>

        <div className="space-y-4">
          {exams.map((exam) => (
            <div key={exam.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="px-6 py-4 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2.5 rounded-lg">
                    <FileText className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{exam.subject}</h3>
                    <p className="text-sm font-medium text-gray-500">{exam.name}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-700">
                  <span className="flex items-center"><CalendarIcon className="h-4 w-4 mr-1.5 text-indigo-500" /> {exam.date}</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5 text-indigo-500" /> {exam.time}</span>
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5 text-indigo-500" /> {exam.room}</span>
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Syllabus Covered</p>
                <p className="text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 inline-block">
                  {exam.syllabus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
