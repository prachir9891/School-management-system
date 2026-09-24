import { useState, useMemo } from 'react';
import { Trophy, TrendingUp, Award, Download, CheckCircle2, AlertCircle } from 'lucide-react';

const resultData = {
  'UT-1': {
    title: 'Unit Test 1 (2026-27)',
    results: [
      { id: 1, subject: 'Mathematics', marks: 45, max: 50, grade: 'A+', remarks: 'Excellent problem solving.' },
      { id: 2, subject: 'Science', marks: 42, max: 50, grade: 'A', remarks: 'Good grasp of concepts.' },
      { id: 3, subject: 'English', marks: 38, max: 50, grade: 'B+', remarks: 'Work on vocabulary.' },
      { id: 4, subject: 'History', marks: 40, max: 50, grade: 'A', remarks: 'Good understanding of timelines.' },
    ]
  },
  'UT-2': {
    title: 'Unit Test 2 (2026-27)',
    results: [
      { id: 1, subject: 'Mathematics', marks: 48, max: 50, grade: 'A+', remarks: 'Outstanding performance.' },
      { id: 2, subject: 'Science', marks: 45, max: 50, grade: 'A+', remarks: 'Very impressive.' },
      { id: 3, subject: 'English', marks: 42, max: 50, grade: 'A', remarks: 'Significant improvement.' },
      { id: 4, subject: 'History', marks: 39, max: 50, grade: 'B+', remarks: 'Steady progress.' },
    ]
  },
  'Half-Yearly': {
    title: 'Half-Yearly Examination (2026-27)',
    results: [
      { id: 1, subject: 'Mathematics', marks: 92, max: 100, grade: 'A+', remarks: 'Exceptional analytical skills.' },
      { id: 2, subject: 'Science', marks: 88, max: 100, grade: 'A', remarks: 'Strong theoretical knowledge.' },
      { id: 3, subject: 'English', marks: 82, max: 100, grade: 'A-', remarks: 'Good essays and grammar.' },
      { id: 4, subject: 'History', marks: 85, max: 100, grade: 'A', remarks: 'Well articulated answers.' },
      { id: 5, subject: 'Geography', marks: 89, max: 100, grade: 'A', remarks: 'Great map work.' },
    ]
  },
  'Annual': {
    title: 'Annual Examination (2026-27)',
    results: [
      { id: 1, subject: 'Mathematics', marks: 95, max: 100, grade: 'A+', remarks: 'Top of the class.' },
      { id: 2, subject: 'Science', marks: 91, max: 100, grade: 'A+', remarks: 'Brilliant understanding.' },
      { id: 3, subject: 'English', marks: 88, max: 100, grade: 'A', remarks: 'Very creative writing.' },
      { id: 4, subject: 'History', marks: 90, max: 100, grade: 'A+', remarks: 'Excellent memory for events.' },
      { id: 5, subject: 'Geography', marks: 92, max: 100, grade: 'A+', remarks: 'Perfect score in practicals.' },
    ]
  }
};

export default function StudentResults() {
  const [activeTab, setActiveTab] = useState('Half-Yearly');
  const currentData = resultData[activeTab];

  // Calculate Overall Metrics
  const summary = useMemo(() => {
    let totalObtained = 0;
    let totalMax = 0;
    
    currentData.results.forEach(r => {
      totalObtained += r.marks;
      totalMax += r.max;
    });

    const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : 0;
    
    let status = 'Pass';
    let statusColor = 'text-emerald-600';
    let statusBg = 'bg-emerald-50';
    let statusBorder = 'border-emerald-100';
    let StatusIcon = CheckCircle2;

    if (percentage < 33) {
      status = 'Fail';
      statusColor = 'text-rose-600';
      statusBg = 'bg-rose-50';
      statusBorder = 'border-rose-100';
      StatusIcon = AlertCircle;
    } else if (percentage >= 90) {
      status = 'Pass - Distinction';
    } else if (percentage >= 75) {
      status = 'Pass - First Class';
    }

    return { totalObtained, totalMax, percentage, status, statusColor, statusBg, statusBorder, StatusIcon };
  }, [currentData]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
        <p className="text-sm text-gray-500 mt-1">View your marks, grades, and overall academic performance.</p>
      </div>

      {/* Primary Exam Selector Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-wrap gap-2">
        {Object.keys(resultData).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === key 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
          <Trophy className="absolute -right-6 -bottom-6 h-32 w-32 text-indigo-500 opacity-30" />
          <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider mb-2">Overall Percentage</h3>
          <p className="text-5xl font-black relative z-10">{summary.percentage}%</p>
          <p className="text-sm font-medium text-indigo-100 mt-2 relative z-10">Total: {summary.totalObtained} / {summary.totalMax}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Performance Trend</h3>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
          </div>
          <p className="text-4xl font-black text-gray-900">Consistent</p>
          <p className="text-sm font-bold text-emerald-500 mt-1">Keep it up!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Result Status</h3>
            <div className={`p-2 rounded-lg ${summary.statusBg} ${summary.statusColor}`}>
              <summary.StatusIcon className="h-5 w-5" />
            </div>
          </div>
          <p className={`text-2xl font-black ${summary.statusColor}`}>{summary.status}</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Based on {activeTab} marks</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900">{currentData.title}</h2>
          <button className="flex items-center text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Marks Obtained</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Percentage</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Teacher's Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {currentData.results.map((result) => {
                const subjPercent = ((result.marks / result.max) * 100).toFixed(1);
                return (
                  <tr key={result.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-lg font-black text-gray-900">{result.marks}</span>
                      <span className="text-sm font-medium text-gray-400"> / {result.max}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-bold text-gray-700">{subjPercent}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold ${
                        result.grade.includes('A') ? 'bg-emerald-100 text-emerald-700' : 
                        result.grade.includes('B') ? 'bg-indigo-100 text-indigo-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {result.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Footer for Totals */}
            <tfoot className="bg-gray-50/80 border-t-2 border-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-lg font-black text-indigo-700">{summary.totalObtained}</span>
                  <span className="text-sm font-bold text-gray-500"> / {summary.totalMax}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-black text-indigo-700">
                  {summary.percentage}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`mx-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest ${summary.statusBg} ${summary.statusColor} border ${summary.statusBorder}`}>
                    {summary.percentage >= 90 ? 'A+' : summary.percentage >= 75 ? 'A' : summary.percentage >= 60 ? 'B' : 'C'}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-500">
                  -
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
