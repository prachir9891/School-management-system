import { useState } from 'react';
import { Search, Plus, UserX, UserCheck, Edit2, Trash2, X, Phone, MessageSquare, MapPin } from 'lucide-react';

export default function PrincipalStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', rollNo: '', grade: '10th', section: 'A', status: 'Active', parentPhone: '', address: ''
  });

  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Patel', rollNo: '101', grade: '10th', section: 'A', status: 'Active', attendance: 92, parentPhone: '+1 555 1234', address: '123 Main St, Springfield' },
    { id: 2, name: 'Priya Sharma', rollNo: '102', grade: '10th', section: 'A', status: 'Active', attendance: 85, parentPhone: '+1 555 1235', address: '456 Elm St, Springfield' },
    { id: 3, name: 'Rahul Kumar', rollNo: '205', grade: '12th', section: 'B', status: 'Inactive', attendance: 45, parentPhone: '+1 555 1236', address: '789 Oak Ave, Springfield' },
    { id: 4, name: 'Neha Gupta', rollNo: '150', grade: '11th', section: 'C', status: 'Active', attendance: 98, parentPhone: '+1 555 1237', address: '321 Pine Rd, Springfield' },
  ]);

  const filteredStudents = students.filter(s => 
    (gradeFilter === 'All' || s.grade === gradeFilter) &&
    (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.includes(searchQuery))
  );

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      grade: student.grade,
      section: student.section,
      status: student.status,
      parentPhone: student.parentPhone,
      address: student.address
    });
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to remove this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setStudents(students.map(s => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      setStudents([{ ...formData, id: Date.now(), attendance: 100 }, ...students]);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', rollNo: '', grade: '10th', section: 'A', status: 'Active', parentPhone: '', address: '' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Overview</h1>
          <p className="text-sm text-gray-500 mt-1">School-wide student body directory and metrics.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or roll no..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:border-indigo-500 shadow-sm"
            />
          </div>
          <select 
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 shadow-sm w-full sm:w-auto font-medium"
          >
            <option value="All">All Grades</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="1st">1st Grade</option>
            <option value="2nd">2nd Grade</option>
            <option value="3rd">3rd Grade</option>
            <option value="4th">4th Grade</option>
            <option value="5th">5th Grade</option>
            <option value="6th">6th Grade</option>
            <option value="7th">7th Grade</option>
            <option value="8th">8th Grade</option>
            <option value="9th">9th Grade</option>
            <option value="10th">10th Grade</option>
            <option value="11th">11th Grade</option>
            <option value="12th">12th Grade</option>
          </select>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center shrink-0">
            <Plus className="h-4 w-4 mr-2" /> Add New Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Grade & Section</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact & Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Attendance</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-medium">No students found matching your criteria.</td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-4 shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">Roll No: {student.rollNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-[11px] leading-5 font-bold rounded-lg bg-gray-100 text-gray-700 uppercase tracking-wider">
                        {student.grade} - Sec {student.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" /> {student.parentPhone}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1 max-w-[150px] truncate" title={student.address}>
                        <MapPin className="h-3 w-3 mr-1 text-gray-400 shrink-0" /> {student.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.status === 'Active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          <UserCheck className="h-3 w-3 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                          <UserX className="h-3 w-3 mr-1" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-bold ${student.attendance < 75 ? 'text-rose-600' : 'text-gray-900'}`}>{student.attendance}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title={`Call ${student.parentPhone}`}>
                          <Phone className="h-4 w-4" />
                        </button>
                        <div className="w-px h-4 bg-gray-200 mx-1 hidden sm:block"></div>
                        <button onClick={() => handleEdit(student)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">{editingId ? 'Edit Student Details' : 'Add New Student'}</h3>
              <button onClick={closeForm} className="p-1 text-gray-400 hover:text-rose-600 transition-colors"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="studentForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="e.g. Aarav Patel" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Roll Number</label>
                    <input required type="text" value={formData.rollNo} onChange={(e) => setFormData({...formData, rollNo: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="e.g. 101" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                    <select required value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Grade</label>
                    <select required value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500">
                      <option>Nursery</option>
                      <option>LKG</option>
                      <option>UKG</option>
                      <option>1st</option>
                      <option>2nd</option>
                      <option>3rd</option>
                      <option>4th</option>
                      <option>5th</option>
                      <option>6th</option>
                      <option>7th</option>
                      <option>8th</option>
                      <option>9th</option>
                      <option>10th</option>
                      <option>11th</option>
                      <option>12th</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Section</label>
                    <select required value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Parent Contact Phone</label>
                    <input required type="text" value={formData.parentPhone} onChange={(e) => setFormData({...formData, parentPhone: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="+1 555 1234" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Permanent Address</label>
                    <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" placeholder="123 Main St..." />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={closeForm} className="px-4 py-2 border text-gray-700 text-sm font-semibold rounded-xl hover:bg-white transition-colors">Cancel</button>
              <button type="submit" form="studentForm" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                {editingId ? 'Update Student' : 'Save Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
