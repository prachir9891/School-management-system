import { useState } from 'react';
import { ClipboardList, Plus, Star, Clock, X, Edit2, Users, CheckCircle } from 'lucide-react';

export default function TeacherAssignments() {
  const [showForm, setShowForm] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Term 1 Science Project', class: '10-A', subject: 'Science', dueDate: '2026-11-15', type: 'Project', weight: '20%' },
    { id: 2, title: 'Book Review Essay', class: '9-B', subject: 'English', dueDate: '2026-11-05', type: 'Essay', weight: '15%' },
  ]);

  const [formData, setFormData] = useState({ class: '10-A', subject: 'Science', title: '', type: 'Project', dueDate: '', weight: '' });

  const mockSubmissions = [
    { id: 1, student: 'Aarav Patel', rollNo: '101', date: 'Nov 12, 10:30 AM', status: 'Submitted', file: 'project_final.pdf' },
    { id: 2, student: 'Priya Sharma', rollNo: '102', date: 'Nov 14, 02:15 PM', status: 'Submitted', file: 'science_term1.pdf' },
    { id: 3, student: 'Rahul Kumar', rollNo: '103', date: '-', status: 'Pending', file: null },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setAssignments(assignments.map(a => a.id === editingId ? { ...formData, id: editingId } : a));
    } else {
      setAssignments([{ ...formData, id: Date.now() }, ...assignments]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const openEdit = (assignment) => {
    setFormData(assignment);
    setEditingId(assignment.id);
    setShowForm(true);
  };

  const openNew = () => {
    setFormData({ class: '10-A', subject: 'Science', title: '', type: 'Project', dueDate: '', weight: '' });
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments & Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage long-term assignments and view student submissions.</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-indigo-50 px-3 py-1.5 rounded-bl-xl text-xs font-bold text-indigo-700 border-b border-l border-indigo-100">
              {assignment.type}
            </div>
            
            <div className="flex items-start mt-2">
              <div className="bg-indigo-50 p-3 rounded-xl mr-4">
                <ClipboardList className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                <p className="text-sm font-medium text-gray-600 mt-1">{assignment.class} • {assignment.subject}</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 border-t border-gray-50 pt-4">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                Due: <span className="text-gray-900 ml-1">{assignment.dueDate}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Star className="h-4 w-4 mr-1.5 text-amber-400 fill-amber-400" />
                Weight: <span className="text-gray-900 ml-1">{assignment.weight}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => openEdit(assignment)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center">
                <Edit2 className="h-4 w-4 mr-2" /> Edit
              </button>
              <button onClick={() => setShowSubmissions(true)} className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-xl hover:bg-indigo-100 transition-colors flex justify-center items-center">
                <Users className="h-4 w-4 mr-2" /> View Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900 text-lg">{editingId ? 'Edit Assignment' : 'Add New Assignment'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Class</label>
                  <input required type="text" value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                  <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Type (e.g. Project)</label>
                  <input required type="text" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Weightage</label>
                  <input required type="text" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Due Date</label>
                <input required type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700">Save Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Submissions Modal */}
      {showSubmissions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900 text-lg">Student Submissions</h3>
              <button onClick={() => setShowSubmissions(false)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted On</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {mockSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-900">{sub.student}</p>
                        <p className="text-xs text-gray-500">Roll No: {sub.rollNo}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.status === 'Submitted' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <CheckCircle className="h-3 w-3 mr-1" /> {sub.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <Clock className="h-3 w-3 mr-1" /> {sub.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                        {sub.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {sub.file && (
                          <button className="text-indigo-600 hover:text-indigo-900">View File</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
