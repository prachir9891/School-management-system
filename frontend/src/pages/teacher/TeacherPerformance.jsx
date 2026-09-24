import { TrendingUp, Award, Target, Users } from 'lucide-react';

export default function TeacherPerformance() {
  const topStudents = [
    { id: 1, name: 'Priya Sharma', score: '98%', class: '10-A Math' },
    { id: 2, name: 'Rahul Kumar', score: '95%', class: '10-A Math' },
    { id: 3, name: 'Neha Gupta', score: '94%', class: '10-A Math' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Class Performance</h1>
        <p className="text-sm text-gray-500 mt-1">Analytics and performance tracking for your classes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Class Average</h3>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><TrendingUp className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className="text-4xl font-black text-gray-900">82%</span>
            <span className="text-sm font-medium text-emerald-500 mb-1">+4% from last term</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pass Percentage</h3>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Target className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className="text-4xl font-black text-gray-900">94%</span>
            <span className="text-sm font-medium text-gray-400 mb-1">Target: 95%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Students</h3>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className="text-4xl font-black text-gray-900">103</span>
            <span className="text-sm font-medium text-gray-400 mb-1">Across 3 classes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-500" />
            Top Performers (10-A Math)
          </h3>
          <ul className="space-y-4">
            {topStudents.map((student, index) => (
              <li key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                    <p className="text-xs font-medium text-gray-500">{student.class}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-lg border border-emerald-100">
                  {student.score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Grade Distribution</h3>
          <div className="space-y-5">
            {[
              { grade: 'A (90-100%)', count: 12, percent: 34, color: 'bg-emerald-500' },
              { grade: 'B (80-89%)', count: 15, percent: 43, color: 'bg-indigo-500' },
              { grade: 'C (70-79%)', count: 5, percent: 14, color: 'bg-amber-500' },
              { grade: 'D (<70%)', count: 3, percent: 9, color: 'bg-rose-500' },
            ].map((stat) => (
              <div key={stat.grade}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-bold text-gray-700">{stat.grade}</span>
                  <span className="font-medium text-gray-500">{stat.count} Students ({stat.percent}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${stat.color} h-2.5 rounded-full`} style={{ width: `${stat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
