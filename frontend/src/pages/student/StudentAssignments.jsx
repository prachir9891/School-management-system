import { useState } from 'react';
import { ClipboardList, Star, Clock, Upload, CheckCircle, FileText } from 'lucide-react';

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Term 1 Science Project', subject: 'Science', dueDate: '2026-11-15', type: 'Project', weight: '20%', status: 'Pending', file: null },
    { id: 2, title: 'Book Review Essay', subject: 'English', dueDate: '2026-11-05', type: 'Essay', weight: '15%', status: 'Submitted', file: 'essay_final.pdf' },
  ]);

  const handleUpload = (id) => {
    setAssignments(assignments.map(a => {
      if (a.id === id) {
        return { ...a, status: 'Submitted', file: 'new_submission.pdf' };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments & Projects</h1>
        <p className="text-sm text-gray-500 mt-1">Submit long-term assignments and track weightage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-indigo-50 px-3 py-1.5 rounded-bl-xl text-xs font-bold text-indigo-700 border-b border-l border-indigo-100">
              {assignment.type}
            </div>
            
            <div className="flex items-start mt-2">
              <div className="bg-indigo-50 p-3 rounded-xl mr-4">
                <ClipboardList className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                <p className="text-sm font-medium text-gray-600 mt-1">{assignment.subject}</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 border-t border-gray-50 pt-4">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Clock className="h-4 w-4 mr-1.5 text-rose-400" />
                Due: <span className="text-gray-900 ml-1">{assignment.dueDate}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-500">
                <Star className="h-4 w-4 mr-1.5 text-amber-400 fill-amber-400" />
                Weight: <span className="text-gray-900 ml-1">{assignment.weight}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                {assignment.status === 'Submitted' ? (
                  <div className="flex items-center text-emerald-600 font-bold text-sm">
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Submitted
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600 font-bold text-sm">
                    <Clock className="h-4 w-4 mr-1.5" /> Pending Submission
                  </div>
                )}
              </div>
              
              <div>
                {assignment.status === 'Submitted' ? (
                  <div className="flex items-center text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors">
                    <FileText className="h-4 w-4 mr-2" /> {assignment.file}
                  </div>
                ) : (
                  <button onClick={() => handleUpload(assignment.id)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
                    <Upload className="h-4 w-4 mr-2" /> Upload Work
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
