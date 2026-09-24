import { FileText, CheckCircle, MessageSquare, DollarSign } from 'lucide-react';

export default function ParentPanel() {
  const childStats = {
    name: 'Aarav Johnson',
    grade: '8th Grade',
    attendance: '92%',
    gpa: '84%',
  };

  const recentGrades = [
    { id: 1, subject: 'Mathematics', grade: 'A', date: 'Oct 12, 2026' },
    { id: 2, subject: 'Science', grade: 'A-', date: 'Oct 10, 2026' },
    { id: 3, subject: 'English', grade: 'B+', date: 'Oct 05, 2026' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parent Portal</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your child's academic performance and school activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center lg:col-span-2 relative overflow-hidden bg-gradient-to-tr from-indigo-50 to-white">
          <div className="flex w-full items-center justify-between z-10">
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white">
                A
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{childStats.name}</h2>
                <p className="text-sm font-medium text-gray-500">{childStats.grade}</p>
              </div>
            </div>
            <div className="flex space-x-8 pr-4">
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Attendance</p>
                <p className="text-2xl font-bold text-emerald-600">{childStats.attendance}</p>
              </div>
              <div className="text-center border-l border-gray-200 pl-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Avg Score</p>
                <p className="text-2xl font-bold text-indigo-600">{childStats.gpa}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="h-5 w-5 text-rose-500" />
            <h3 className="text-sm font-semibold text-gray-800">Fee Status</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">₹2,500</p>
          <p className="text-xs font-medium text-rose-500">Pending Term 2 Fees</p>
          <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            Pay Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Grades */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-gray-400" /> Recent Grades
            </h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentGrades.map((grade) => (
              <li key={grade.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-gray-900">{grade.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">Recorded on {grade.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                    {grade.grade}
                  </span>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Teacher Remarks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-indigo-400" /> Teacher Remarks
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-gray-900">Mathematics Teacher</span>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-700">Aarav has shown remarkable improvement in Algebra this term. However, he needs to submit his homework more consistently.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-gray-900">Class Teacher</span>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
              <p className="text-sm text-gray-700">Excellent participation in the science fair. Keep up the good work!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
