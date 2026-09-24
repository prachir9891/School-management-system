import { useState } from 'react';
import { PenTool, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

export default function StudentHomework() {
  const [homeworks, setHomeworks] = useState([
    { id: 1, title: 'Algebra Equations Exercise 4', subject: 'Mathematics', assignedBy: 'Mrs. Sharma', date: 'Oct 24, 2026', dueDate: 'Oct 26, 2026', status: 'Pending', desc: 'Solve equations 1-20 in your notebook.' },
    { id: 2, title: 'Physics Chapter 2 Questions', subject: 'Physics', assignedBy: 'Mr. John', date: 'Oct 23, 2026', dueDate: 'Oct 25, 2026', status: 'Completed', desc: 'Read chapter 2 and answer all odd questions.' },
    { id: 3, title: 'Essay on Global Warming', subject: 'English', assignedBy: 'Ms. Davis', date: 'Oct 25, 2026', dueDate: 'Oct 28, 2026', status: 'Pending', desc: 'Write a 500-word essay on the effects of global warming.' },
  ]);

  const toggleStatus = (id) => {
    setHomeworks(homeworks.map(hw => {
      if (hw.id === id) {
        return { ...hw, status: hw.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return hw;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daily Homework</h1>
        <p className="text-sm text-gray-500 mt-1">Keep track of your daily tasks and mark them as complete.</p>
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
            <ul className="divide-y divide-gray-50">
              {homeworks.map((hw) => (
                <li key={hw.id} className={`p-6 hover:bg-gray-50 transition-colors flex gap-4 ${hw.status === 'Completed' ? 'bg-gray-50/50' : ''}`}>
                  <button 
                    onClick={() => toggleStatus(hw.id)} 
                    className="mt-1 flex-shrink-0 text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {hw.status === 'Completed' ? (
                      <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                    ) : (
                      <Circle className="h-7 w-7 text-gray-300" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-lg font-bold ${hw.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{hw.title}</h3>
                        <p className="text-sm font-bold text-indigo-600 mt-1">{hw.subject} • {hw.assignedBy}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${hw.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {hw.status === 'Completed' ? 'Done' : 'Pending'}
                      </span>
                    </div>
                    <p className={`text-sm mt-3 ${hw.status === 'Completed' ? 'text-gray-400' : 'text-gray-600'}`}>{hw.desc}</p>
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
