import { MessageCircle, Star, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ParentRemarks() {
  const remarks = [
    { id: 1, type: 'Positive', teacher: 'Mrs. Sharma', subject: 'Mathematics', date: 'Oct 24, 2026', content: 'Aarav has shown great improvement in solving complex algebra equations. Keep it up!' },
    { id: 2, type: 'Alert', teacher: 'Mr. John', subject: 'Physics', date: 'Oct 20, 2026', content: 'Aarav has been distracted during the last few lab sessions. Please speak with him.' },
    { id: 3, type: 'General', teacher: 'Ms. Davis', subject: 'English', date: 'Oct 15, 2026', content: 'The recent essay submitted was well researched. Good effort.' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Remarks</h1>
        <p className="text-sm text-gray-500 mt-1">Direct feedback and behavioral notes from your child's teachers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {remarks.map((remark) => (
            <div key={remark.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex gap-4 hover:shadow-md transition-all">
              <div className={`p-3 rounded-xl h-min ${remark.type === 'Positive' ? 'bg-emerald-50 text-emerald-600' : remark.type === 'Alert' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
                {remark.type === 'Positive' ? <Star className="h-6 w-6" /> : remark.type === 'Alert' ? <AlertTriangle className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{remark.teacher}</h3>
                    <p className="text-sm font-bold text-gray-500">{remark.subject}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-400">{remark.date}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  "{remark.content}"
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Reply to Teacher</button>
                  <button className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Acknowledge</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="font-bold text-indigo-100 uppercase tracking-wider text-sm mb-4">Behavioral Score</h3>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-indigo-600 font-black text-2xl">
                A
              </div>
              <div>
                <p className="text-xl font-bold">Excellent</p>
                <p className="text-sm text-indigo-200 mt-1">Based on teacher evaluations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
