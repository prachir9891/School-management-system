import { useState } from 'react';
import { PenTool, Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function ParentHomework() {
  const [selectedChild, setSelectedChild] = useState('Aarav Patel');
  
  const homeworks = [
    { id: 1, title: 'Algebra Equations Exercise 4', subject: 'Mathematics', assignedBy: 'Mrs. Sharma', date: 'Oct 24, 2026', dueDate: 'Oct 26, 2026', status: 'Pending', desc: 'Solve equations 1-20 in notebook.' },
    { id: 2, title: 'Physics Chapter 2 Questions', subject: 'Physics', assignedBy: 'Mr. John', date: 'Oct 23, 2026', dueDate: 'Oct 25, 2026', status: 'Completed', desc: 'Read chapter 2 and answer odd questions.' },
    { id: 3, title: 'Term 1 Science Project', subject: 'Science', assignedBy: 'Mrs. Sharma', date: 'Oct 15, 2026', dueDate: 'Nov 15, 2026', status: 'Pending', desc: 'Create a working model of a plant cell.' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor your child's daily assignments and projects.</p>
        </div>
        <select 
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 font-semibold shadow-sm"
        >
          <option value="Aarav Patel">👦 Aarav Patel (10-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-indigo-100 uppercase tracking-wider text-sm mb-1">To-Do List</h3>
            <p className="text-4xl font-black">{homeworks.filter(h => h.status === 'Pending').length}</p>
            <p className="text-sm font-medium text-indigo-200 mt-2">Pending Tasks</p>
          </div>
          <div className="bg-emerald-500 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-emerald-100 uppercase tracking-wider text-sm mb-1">Completed</h3>
            <p className="text-4xl font-black">{homeworks.filter(h => h.status === 'Completed').length}</p>
            <p className="text-sm font-medium text-emerald-100 mt-2">Tasks Finished</p>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700">Recent Assignments</div>
            <ul className="divide-y divide-gray-50">
              {homeworks.map((hw) => (
                <li key={hw.id} className="p-6 hover:bg-gray-50 transition-colors flex gap-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${hw.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {hw.status === 'Completed' ? <CheckCircle2 className="h-6 w-6" /> : <PenTool className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{hw.title}</h3>
                        <p className="text-sm font-bold text-indigo-600 mt-1">{hw.subject} • Teacher: {hw.assignedBy}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${hw.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {hw.status}
                      </span>
                    </div>
                    <p className="text-sm mt-3 text-gray-600">{hw.desc}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-xs font-bold text-gray-500">
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" /> Assigned: {hw.date}</span>
                      <span className={`flex items-center ${hw.status !== 'Completed' ? 'text-rose-500' : ''}`}>
                        <Clock className="h-4 w-4 mr-1.5" /> Due: {hw.dueDate}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
