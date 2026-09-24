import { useState } from 'react';
import { Search, Mail, Phone, BookOpen, MoreVertical, TrendingUp, Plus, Edit2, Trash2, X, Users } from 'lucide-react';

export default function PrincipalTeachers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', department: '', subjects: '', email: '', phone: '', classTeacher: ''
  });

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Mrs. Sharma', department: 'Science', subjects: ['Mathematics', 'Physics'], email: 'sharma@school.edu', phone: '+1 234 567 8900', classTeacher: '10-A', performance: 'Excellent' },
    { id: 2, name: 'Mr. John', department: 'Science', subjects: ['Physics', 'Chemistry'], email: 'john@school.edu', phone: '+1 234 567 8901', classTeacher: '11-B', performance: 'Good' },
    { id: 3, name: 'Ms. Davis', department: 'English', subjects: ['English Lit.', 'Grammar'], email: 'davis@school.edu', phone: '+1 234 567 8902', classTeacher: '9-C', performance: 'Outstanding' },
    { id: 4, name: 'Mr. Smith', department: 'Physical Education', subjects: ['Sports', 'Health'], email: 'smith@school.edu', phone: '+1 234 567 8903', classTeacher: 'None', performance: 'Average' },
  ]);

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (teacher) => {
    setFormData({
      name: teacher.name,
      department: teacher.department,
      subjects: teacher.subjects.join(', '),
      email: teacher.email,
      phone: teacher.phone,
      classTeacher: teacher.classTeacher
    });
    setEditingId(teacher.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to remove this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectList = formData.subjects.split(',').map(s => s.trim());
    
    if (editingId) {
      setTeachers(teachers.map(t => t.id === editingId ? { ...t, ...formData, subjects: subjectList } : t));
    } else {
      setTeachers([...teachers, { ...formData, id: Date.now(), subjects: subjectList, performance: 'New' }]);
    }
    
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', department: '', subjects: '', email: '', phone: '', classTeacher: '' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teaching Staff Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review all faculty members.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:border-indigo-500 shadow-sm"
            />
          </div>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center shrink-0">
            <Plus className="h-4 w-4 mr-2" /> Add New Teacher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur rounded-lg shadow-sm border border-gray-100 p-1">
              <button onClick={() => handleEdit(teacher)} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(teacher.id)} className="p-1.5 text-gray-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold shrink-0">
                {teacher.name.charAt(0)}
              </div>
              <div className="pr-12">
                <h3 className="text-lg font-bold text-gray-900 truncate">{teacher.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 mt-1 uppercase tracking-wider">
                  {teacher.department} Dept.
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex flex-wrap items-center text-sm font-medium text-gray-600">
                <BookOpen className="h-4 w-4 mr-2 text-indigo-500 shrink-0" />
                {teacher.subjects.join(', ')}
              </div>
              <div className="flex items-center text-sm font-medium text-gray-600">
                <Users className="h-4 w-4 mr-2 text-indigo-500 shrink-0" />
                Class Teacher: <span className="font-bold text-gray-900 ml-1">{teacher.classTeacher}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-indigo-500 shrink-0" />
                {teacher.email}
              </div>
              <div className="flex items-center text-sm font-medium text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-indigo-500 shrink-0" />
                {teacher.phone}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex gap-3">
              <button className="flex-1 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center">
                <TrendingUp className="h-4 w-4 mr-2" /> Performance
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed">
          <p className="text-gray-500 font-medium">No teachers found matching your search.</p>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">{editingId ? 'Edit Teacher Details' : 'Add New Teacher'}</h3>
              <button onClick={closeForm} className="p-1 text-gray-400 hover:text-rose-600 transition-colors"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="teacherForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="e.g. Mr. Smith" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                    <input required type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="e.g. Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Class Teacher Of</label>
                    <input required type="text" value={formData.classTeacher} onChange={(e) => setFormData({...formData, classTeacher: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="e.g. 10-A or None" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subjects (Comma separated)</label>
                  <input required type="text" value={formData.subjects} onChange={(e) => setFormData({...formData, subjects: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="e.g. Mathematics, Physics" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                    <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={closeForm} className="px-4 py-2 border text-gray-700 text-sm font-semibold rounded-xl hover:bg-white transition-colors">Cancel</button>
              <button type="submit" form="teacherForm" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                {editingId ? 'Update Teacher' : 'Save Teacher'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
