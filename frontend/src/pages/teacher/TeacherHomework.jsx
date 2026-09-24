import { useState } from 'react';
import { Plus, PenTool, Calendar, CheckCircle, X, Paperclip, Clock } from 'lucide-react';

export default function TeacherHomework() {
  const [activeTab, setActiveTab] = useState('Active');
  const [showForm, setShowForm] = useState(false);
  
  const [homeworks, setHomeworks] = useState([
    { id: 1, title: 'Algebra Equations Exercise 4', subject: 'Mathematics', class: '10-A', date: 'Oct 24, 2026', dueDate: 'Oct 26, 2026', submitted: 30, total: 35, status: 'Active', desc: 'Solve equations 1-20.' },
    { id: 2, title: 'Physics Chapter 2 Questions', subject: 'Physics', class: '12-B', date: 'Oct 23, 2026', dueDate: 'Oct 25, 2026', submitted: 28, total: 28, status: 'Completed', desc: 'Read chapter 2 and answer all odd questions.' },
    { id: 3, title: 'Intro to Python Scripting', subject: 'Computer Science', class: '11-C', date: 'Oct 25, 2026', dueDate: 'Oct 28, 2026', submitted: 15, total: 40, status: 'Pending', desc: 'Write a script to print fibonacci sequence.' },
  ]);

  const [formData, setFormData] = useState({ class: '10-A', subject: 'Mathematics', title: '', desc: '', dueDate: '' });

  const handleAssign = (e) => {
    e.preventDefault();
    const newHw = {
      id: Date.now(),
      title: formData.title,
      subject: formData.subject,
      class: formData.class,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
      dueDate: formData.dueDate,
      submitted: 0,
      total: 35, // default mock
      status: 'Active',
      desc: formData.desc
    };
    setHomeworks([newHw, ...homeworks]);
    setShowForm(false);
    setFormData({ class: '10-A', subject: 'Mathematics', title: '', desc: '', dueDate: '' });
  };

  const filtered = homeworks.filter(hw => hw.status === activeTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and track daily homework assignments.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Assign Homework
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        {['Active', 'Pending', 'Completed'].map(tab => (
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
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium">No {activeTab.toLowerCase()} homework found.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map((hw) => (
              <li key={hw.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl mt-1 ${hw.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : hw.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {hw.status === 'Completed' ? <CheckCircle className="h-6 w-6" /> : hw.status === 'Pending' ? <Clock className="h-6 w-6" /> : <PenTool className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{hw.title}</h3>
                    <p className="text-sm font-medium text-indigo-600 mt-1">{hw.class} • {hw.subject}</p>
                    <p className="text-xs text-gray-500 mt-2 max-w-lg truncate">{hw.desc}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs font-medium text-gray-500">
                      <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> Assigned: {hw.date}</span>
                      <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1 text-rose-400" /> Due: {hw.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 mt-4 md:mt-0">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Submissions</p>
                    <p className="text-lg font-bold text-gray-900">
                      <span className={hw.submitted === hw.total ? 'text-emerald-600' : 'text-indigo-600'}>{hw.submitted}</span>
                      <span className="text-gray-400">/{hw.total}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Assign Homework Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900 text-lg">Assign New Homework</h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAssign} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Class</label>
                  <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="10-A">10-A</option>
                    <option value="11-C">11-C</option>
                    <option value="12-B">12-B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                  <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Homework Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Algebra Chapter 2" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea required rows="3" value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Instructions for the students..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Due Date</label>
                <input required type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Attachments (Optional)</label>
                <div className="flex items-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Paperclip className="w-5 h-5" />
                      <span className="text-sm font-medium">Click to attach files (PDF, JPG)</span>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                  Assign Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
