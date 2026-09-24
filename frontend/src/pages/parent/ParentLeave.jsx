import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, Send } from 'lucide-react';

export default function ParentLeave() {
  const [showForm, setShowForm] = useState(false);
  
  const [applications, setApplications] = useState([
    { id: 1, child: 'Aarav Patel', from: '2026-10-15', to: '2026-10-16', reason: 'Fever and cold', status: 'Approved', appliedOn: '2026-10-14' },
    { id: 2, child: 'Aarav Patel', from: '2026-09-01', to: '2026-09-03', reason: 'Family function out of town', status: 'Approved', appliedOn: '2026-08-25' },
    { id: 3, child: 'Aarav Patel', from: '2026-11-20', to: '2026-11-20', reason: 'Dental appointment', status: 'Pending', appliedOn: '2026-10-24' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Leave application submitted successfully for review.');
    setShowForm(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Apply for leaves and track approval status.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Apply Leave
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {applications.map((app) => (
            <li key={app.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{app.reason}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-gray-500">
                  <span className="flex items-center text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    <Calendar className="h-4 w-4 mr-1.5" /> {app.from} to {app.to}
                  </span>
                  <span className="flex items-center">Applied on: {app.appliedOn}</span>
                </div>
              </div>
              <div className="flex items-center">
                {app.status === 'Approved' ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Approved
                  </span>
                ) : app.status === 'Pending' ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold bg-amber-100 text-amber-800">
                    <Clock className="h-4 w-4 mr-1.5" /> Pending Review
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold bg-rose-100 text-rose-800">
                    <XCircle className="h-4 w-4 mr-1.5" /> Rejected
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">Apply for Leave</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-rose-600">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Select Child</label>
                <select className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500">
                  <option>Aarav Patel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">From Date</label>
                  <input required type="date" className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">To Date</label>
                  <input required type="date" className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Reason for Leave</label>
                <textarea required rows="3" placeholder="Please specify the detailed reason..." className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500"></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border text-sm font-semibold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl flex items-center">
                  <Send className="h-4 w-4 mr-2" /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
