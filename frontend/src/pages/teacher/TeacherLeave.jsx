import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, CheckCircle, Clock, XCircle, X } from 'lucide-react';

export default function TeacherLeave() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '', remarks: '' });
  
  const [leaves, setLeaves] = useState([
    { id: 1, type: 'Sick Leave', startDate: 'Oct 15, 2026', endDate: 'Oct 16, 2026', days: 2, status: 'Approved', reason: 'Fever and cold', remarks: 'Medical certificate attached.' },
    { id: 2, type: 'Casual Leave', startDate: 'Nov 20, 2026', endDate: 'Nov 20, 2026', days: 1, status: 'Pending', reason: 'Family function', remarks: 'Will ensure homework is assigned beforehand.' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newLeave = {
      id: Date.now(),
      type: formData.type,
      startDate: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
      endDate: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
      days: diffDays,
      status: 'Pending',
      reason: formData.reason,
      remarks: formData.remarks
    };

    setLeaves([newLeave, ...leaves]);
    setShowForm(false);
    setFormData({ type: 'Casual Leave', startDate: '', endDate: '', reason: '', remarks: '' });
    setActiveTab('Pending');
  };

  const filteredLeaves = leaves.filter(l => l.status === activeTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Apply for leaves and view your history.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Leave
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        {['Pending', 'Approved', 'Rejected'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredLeaves.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium">No {activeTab.toLowerCase()} leave requests found.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredLeaves.map((leave) => (
              <li key={leave.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-xl text-gray-600">
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{leave.type}</p>
                      <p className="text-sm font-medium text-gray-500 mt-1">
                        {leave.startDate} {leave.startDate !== leave.endDate && `to ${leave.endDate}`} • {leave.days} day(s)
                      </p>
                    </div>
                  </div>
                  <div>
                    {leave.status === 'Approved' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Approved
                      </span>
                    )}
                    {leave.status === 'Pending' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        <Clock className="h-3.5 w-3.5 mr-1.5" /> Pending
                      </span>
                    )}
                    {leave.status === 'Rejected' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        <XCircle className="h-3.5 w-3.5 mr-1.5" /> Rejected
                      </span>
                    )}
                  </div>
                </div>
                <div className="pl-[4.5rem]">
                  <p className="text-sm font-bold text-gray-700 mb-1">Reason: <span className="font-normal text-gray-600">{leave.reason}</span></p>
                  <p className="text-sm font-bold text-gray-700">Remarks: <span className="font-normal text-gray-600">{leave.remarks || 'None'}</span></p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Leave Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900 text-lg">Apply for Leave</h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Leave Type</label>
                <select required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                  <input required type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                  <input required type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Reason</label>
                <textarea required rows="2" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Brief reason for leave..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Additional Remarks</label>
                <textarea rows="2" value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Substitution details..."></textarea>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
