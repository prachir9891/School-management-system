import { useState } from 'react';
import { Target, AlertCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function ParentAttendance() {
  const [selectedChild, setSelectedChild] = useState('Aarav Patel');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const stats = {
    present: 22,
    absent: 2,
    percent: 91.6
  };

  const weeks = [
    { id: 1, days: [{ day: 'Mon', date: 5, status: 'P' }, { day: 'Tue', date: 6, status: 'P' }, { day: 'Wed', date: 7, status: 'P' }, { day: 'Thu', date: 8, status: 'P' }, { day: 'Fri', date: 9, status: 'A' }] },
    { id: 2, days: [{ day: 'Mon', date: 12, status: 'P' }, { day: 'Tue', date: 13, status: 'P' }, { day: 'Wed', date: 14, status: 'P' }, { day: 'Thu', date: 15, status: 'P' }, { day: 'Fri', date: 16, status: 'P' }] },
    { id: 3, days: [{ day: 'Mon', date: 19, status: 'P' }, { day: 'Tue', date: 20, status: 'A' }, { day: 'Wed', date: 21, status: 'P' }, { day: 'Thu', date: 22, status: 'P' }, { day: 'Fri', date: 23, status: 'P' }] },
    { id: 4, days: [{ day: 'Mon', date: 26, status: 'P' }, { day: 'Tue', date: 27, status: 'P' }, { day: 'Wed', date: 28, status: 'P' }, { day: 'Thu', date: 29, status: 'P' }, { day: 'Fri', date: 30, status: 'P' }] },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Record</h1>
          <p className="text-sm text-gray-500 mt-1">Track your child's daily presence and overall percentage.</p>
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Overall Percentage</h3>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Target className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className={`text-4xl font-black ${stats.percent >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>{stats.percent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div className={`${stats.percent >= 75 ? 'bg-emerald-500' : 'bg-rose-500'} h-2 rounded-full`} style={{ width: `${stats.percent}%` }}></div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-center text-center">
          <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Present Days</h3>
          <span className="text-5xl font-black text-emerald-600">{stats.present}</span>
        </div>

        <div className="bg-rose-50 rounded-2xl p-6 shadow-sm border border-rose-100 flex flex-col justify-center text-center">
          <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-2">Absent Days</h3>
          <span className="text-5xl font-black text-rose-600">{stats.absent}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" /> Daily Record
          </h2>
          
          <div className="flex items-center space-x-4 bg-white px-4 py-2 border border-gray-200 rounded-xl shadow-sm">
            <button className="text-gray-400 hover:text-indigo-600"><ChevronLeft className="h-5 w-5" /></button>
            <span className="font-bold text-gray-800 w-28 text-center">{selectedMonth}</span>
            <button className="text-gray-400 hover:text-indigo-600"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {weeks.map((week) => (
            <div key={week.id} className="flex border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="w-16 bg-gray-50 flex items-center justify-center border-r border-gray-100 font-bold text-xs text-gray-500 uppercase tracking-wider">
                Wk {week.id}
              </div>
              <div className="flex-1 grid grid-cols-5 divide-x divide-gray-100">
                {week.days.map((day, index) => (
                  <div key={index} className="p-4 text-center flex flex-col items-center hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{day.day} {day.date}</span>
                    {day.status === 'P' ? (
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-black text-lg shadow-sm">P</span>
                    ) : (
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-100 text-rose-700 font-black text-lg shadow-sm">A</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
