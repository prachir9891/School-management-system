import { useState } from 'react';
import { Users, Clock, BookOpen, ChevronRight, X, FileText, CheckCircle, Circle } from 'lucide-react';

export default function TeacherClasses() {
  const [selectedRoster, setSelectedRoster] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const classes = [
    { id: 1, name: 'Class 10-A', subject: 'Mathematics', students: 35, time: '09:00 AM - 10:30 AM', room: 'Room 302', progress: 65 },
    { id: 2, name: 'Class 12-B', subject: 'Physics Advanced', students: 28, time: '11:00 AM - 12:30 PM', room: 'Lab 2', progress: 40 },
    { id: 3, name: 'Class 11-C', subject: 'Computer Science', students: 40, time: '01:30 PM - 03:00 PM', room: 'Lab 1', progress: 85 },
  ];

  const mockRoster = [
    { id: 1, name: 'Alex Johnson', attendance: '95%', grade: 'A' },
    { id: 2, name: 'Sarah Williams', attendance: '88%', grade: 'B+' },
    { id: 3, name: 'Michael Brown', attendance: '92%', grade: 'A-' },
    { id: 4, name: 'Emily Davis', attendance: '76%', grade: 'C' },
    { id: 5, name: 'Daniel Miller', attendance: '100%', grade: 'A+' },
  ];

  const mockLessonPlan = [
    { week: 1, topic: 'Introduction to Core Concepts', status: 'completed' },
    { week: 2, topic: 'Advanced Theories and Application', status: 'in-progress' },
    { week: 3, topic: 'Practical Lab Sessions', status: 'pending' },
    { week: 4, topic: 'Mid-term Review and Assessments', status: 'pending' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your assigned classes and view schedules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                <p className="text-sm font-medium text-indigo-600 mt-1">{cls.subject}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {cls.room}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                {cls.students} Students
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                {cls.time}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Syllabus Progress</span>
                <span className="font-medium text-indigo-600">{cls.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${cls.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedRoster(cls)}
                className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                View Roster
              </button>
              <button 
                onClick={() => setSelectedPlan(cls)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Lesson Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Roster Modal */}
      {selectedRoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedRoster.name} Roster</h3>
                <p className="text-sm text-gray-500">{selectedRoster.subject}</p>
              </div>
              <button onClick={() => setSelectedRoster(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-3">
                {mockRoster.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">Attendance: {student.attendance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Grade: {student.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Plan Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50/30">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedPlan.name} Lesson Plan</h3>
                <p className="text-sm text-indigo-600">{selectedPlan.subject}</p>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="relative border-l-2 border-indigo-100 ml-3 space-y-8">
                {mockLessonPlan.map((lesson) => (
                  <div key={lesson.week} className="relative pl-6">
                    <span className="absolute -left-[11px] bg-white p-1">
                      {lesson.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : lesson.status === 'in-progress' ? (
                        <Circle className="h-5 w-5 text-indigo-500 fill-indigo-100" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Week {lesson.week}</h4>
                      <p className="text-sm text-gray-600 mt-1">{lesson.topic}</p>
                      <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-md ${
                        lesson.status === 'completed' ? 'bg-green-50 text-green-700' :
                        lesson.status === 'in-progress' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
