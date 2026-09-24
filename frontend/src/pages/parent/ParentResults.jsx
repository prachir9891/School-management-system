import { useState } from 'react';
import { Trophy, TrendingUp, Award, Download } from 'lucide-react';

export default function ParentResults() {
  const [selectedChild, setSelectedChild] = useState('Aarav Patel');

  const results = [
    { subject: 'Mathematics', marks: 88, max: 100, grade: 'A', remarks: 'Excellent problem solving.' },
    { subject: 'Physics', marks: 92, max: 100, grade: 'A+', remarks: 'Outstanding theoretical understanding.' },
    { subject: 'Chemistry', marks: 78, max: 100, grade: 'B+', remarks: 'Needs to focus on organic chemistry.' },
    { subject: 'English', marks: 85, max: 100, grade: 'A', remarks: 'Good essays.' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
          <p className="text-sm text-gray-500 mt-1">Review your child's term-wise performance and report cards.</p>
        </div>
        <select 
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 font-semibold shadow-sm"
        >
          <option value="Aarav Patel">👦 Aarav Patel (10-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
          <Trophy className="absolute -right-6 -bottom-6 h-32 w-32 text-indigo-500 opacity-30" />
          <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider mb-2">Overall CGPA</h3>
          <p className="text-5xl font-black relative z-10">8.9</p>
          <p className="text-sm font-medium text-indigo-100 mt-2 relative z-10">Top 10% of class</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Percentage</h3>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
          </div>
          <p className="text-4xl font-black text-gray-900">87.6%</p>
          <p className="text-sm font-bold text-emerald-500 mt-1">+3.2% from last term</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Attendance Grade</h3>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Award className="h-5 w-5" /></div>
          </div>
          <p className="text-4xl font-black text-gray-900">A</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Very punctual</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Term 1 Results (2026-27)</h2>
          <button className="flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            <Download className="h-4 w-4 mr-1" /> Download Report Card
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Marks</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Teacher's Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {results.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {result.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-lg font-black text-gray-900">{result.marks}</span>
                    <span className="text-sm font-medium text-gray-400">/{result.max}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold ${result.grade.includes('A') ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {result.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
