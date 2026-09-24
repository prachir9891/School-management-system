import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, BookOpen, FileText, CheckCircle } from 'lucide-react';

const examData = {
  'UT-1': {
    title: 'Unit Test 1',
    schedule: [
      { id: 1, subject: 'Mathematics', date: 'Jul 15, 2026', day: 'Wednesday', startTime: '09:00 AM', endTime: '10:30 AM' },
      { id: 2, subject: 'Science', date: 'Jul 16, 2026', day: 'Thursday', startTime: '09:00 AM', endTime: '10:30 AM' },
      { id: 3, subject: 'English', date: 'Jul 17, 2026', day: 'Friday', startTime: '09:00 AM', endTime: '10:30 AM' },
      { id: 4, subject: 'History', date: 'Jul 20, 2026', day: 'Monday', startTime: '09:00 AM', endTime: '10:30 AM' },
    ],
    syllabus: [
      { id: 1, subject: 'Mathematics', topics: ['Number Systems', 'Polynomials', 'Coordinate Geometry'] },
      { id: 2, subject: 'Science', topics: ['Matter in Our Surroundings', 'The Fundamental Unit of Life', 'Motion'] },
      { id: 3, subject: 'English', topics: ['Reading Comprehension', 'Tenses', 'The Fun They Had (Prose)'] },
      { id: 4, subject: 'History', topics: ['The French Revolution'] },
    ]
  },
  'UT-2': {
    title: 'Unit Test 2',
    schedule: [
      { id: 1, subject: 'Mathematics', date: 'Oct 12, 2026', day: 'Monday', startTime: '09:00 AM', endTime: '10:30 AM' },
      { id: 2, subject: 'Science', date: 'Oct 13, 2026', day: 'Tuesday', startTime: '09:00 AM', endTime: '10:30 AM' },
      { id: 3, subject: 'English', date: 'Oct 14, 2026', day: 'Wednesday', startTime: '09:00 AM', endTime: '10:30 AM' },
      { id: 4, subject: 'History', date: 'Oct 15, 2026', day: 'Thursday', startTime: '09:00 AM', endTime: '10:30 AM' },
    ],
    syllabus: [
      { id: 1, subject: 'Mathematics', topics: ['Linear Equations in Two Variables', 'Introduction to Euclid\'s Geometry', 'Lines and Angles'] },
      { id: 2, subject: 'Science', topics: ['Is Matter Around Us Pure', 'Tissues', 'Force and Laws of Motion'] },
      { id: 3, subject: 'English', topics: ['Modals', 'Subject-Verb Concord', 'The Sound of Music'] },
      { id: 4, subject: 'History', topics: ['Socialism in Europe and the Russian Revolution'] },
    ]
  },
  'Half-Yearly': {
    title: 'Half-Yearly Examination',
    schedule: [
      { id: 1, subject: 'Mathematics', date: 'Dec 05, 2026', day: 'Saturday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 2, subject: 'Science', date: 'Dec 08, 2026', day: 'Tuesday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 3, subject: 'English', date: 'Dec 11, 2026', day: 'Friday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 4, subject: 'History', date: 'Dec 14, 2026', day: 'Monday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 5, subject: 'Geography', date: 'Dec 16, 2026', day: 'Wednesday', startTime: '09:00 AM', endTime: '12:00 PM' },
    ],
    syllabus: [
      { id: 1, subject: 'Mathematics', topics: ['All UT-1 & UT-2 Topics', 'Triangles', 'Quadrilaterals'] },
      { id: 2, subject: 'Science', topics: ['All UT-1 & UT-2 Topics', 'Gravitation', 'Diversity in Living Organisms'] },
      { id: 3, subject: 'English', topics: ['All Previous Grammar', 'Reported Speech', 'The Little Girl', 'A Truly Beautiful Mind'] },
      { id: 4, subject: 'History', topics: ['All Previous Topics', 'Nazism and the Rise of Hitler'] },
      { id: 5, subject: 'Geography', topics: ['India - Size and Location', 'Physical Features of India'] },
    ]
  },
  'Annual': {
    title: 'Annual Examination',
    schedule: [
      { id: 1, subject: 'Mathematics', date: 'Mar 10, 2027', day: 'Wednesday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 2, subject: 'Science', date: 'Mar 13, 2027', day: 'Saturday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 3, subject: 'English', date: 'Mar 16, 2027', day: 'Tuesday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 4, subject: 'History', date: 'Mar 19, 2027', day: 'Friday', startTime: '09:00 AM', endTime: '12:00 PM' },
      { id: 5, subject: 'Geography', date: 'Mar 22, 2027', day: 'Monday', startTime: '09:00 AM', endTime: '12:00 PM' },
    ],
    syllabus: [
      { id: 1, subject: 'Mathematics', topics: ['Complete Book: Chapters 1 to 15'] },
      { id: 2, subject: 'Science', topics: ['Complete Book: Chapters 1 to 15'] },
      { id: 3, subject: 'English', topics: ['Complete Grammar', 'Complete Prose', 'Complete Poetry', 'Writing Skills'] },
      { id: 4, subject: 'History', topics: ['Complete History Syllabus'] },
      { id: 5, subject: 'Geography', topics: ['Complete Geography Syllabus'] },
    ]
  }
};

export default function StudentExams() {
  const [activeTab, setActiveTab] = useState('UT-1');
  const [viewMode, setViewMode] = useState('schedule'); // 'schedule' or 'syllabus'

  const currentData = examData[activeTab];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Examinations</h1>
        <p className="text-sm text-gray-500 mt-1">View your complete exam schedules, date sheets, and syllabi.</p>
      </div>

      {/* Primary Exam Selector Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-wrap gap-2">
        {Object.keys(examData).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === key 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {examData[key].title}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header and Toggle */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            {currentData.title} Details
          </h2>
          
          <div className="flex p-1 bg-gray-200/60 rounded-lg">
            <button
              onClick={() => setViewMode('schedule')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                viewMode === 'schedule' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4 mr-2" /> Date Sheet
            </button>
            <button
              onClick={() => setViewMode('syllabus')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                viewMode === 'syllabus' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Syllabus
            </button>
          </div>
        </div>

        {/* View Mode: Schedule */}
        {viewMode === 'schedule' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Day</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Timing</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {currentData.schedule.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-indigo-50 p-2 rounded-lg mr-3">
                          <FileText className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-700">{item.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.day}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-gray-600">
                        <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                        {item.startTime} - {item.endTime}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Mode: Syllabus */}
        {viewMode === 'syllabus' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentData.syllabus.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-indigo-700 mb-4 pb-3 border-b border-gray-100 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" /> {item.subject}
                  </h3>
                  <ul className="space-y-3">
                    {item.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-700 leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
