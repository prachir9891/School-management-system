import { useState, useEffect } from 'react';
import { Save, FileText, CheckCircle2 } from 'lucide-react';

export default function TeacherMarks() {
  const [selectedClass, setSelectedClass] = useState('10-A Mathematics');
  const [selectedExam, setSelectedExam] = useState('UT1');
  const [students, setStudents] = useState([]);

  // Mock data mapping exam to student marks
  const mockMarksData = {
    'UT1': [
      { id: 1, rollNo: '101', name: 'Aarav Patel', marks: 18 },
      { id: 2, rollNo: '102', name: 'Priya Sharma', marks: 19 },
      { id: 3, rollNo: '103', name: 'Rahul Kumar', marks: 15 },
      { id: 4, rollNo: '104', name: 'Neha Gupta', marks: 17 },
    ],
    'UT2': [
      { id: 1, rollNo: '101', name: 'Aarav Patel', marks: 17 },
      { id: 2, rollNo: '102', name: 'Priya Sharma', marks: 20 },
      { id: 3, rollNo: '103', name: 'Rahul Kumar', marks: 16 },
      { id: 4, rollNo: '104', name: 'Neha Gupta', marks: 18 },
    ],
    'Half Yearly': [
      { id: 1, rollNo: '101', name: 'Aarav Patel', marks: 85 },
      { id: 2, rollNo: '102', name: 'Priya Sharma', marks: 92 },
      { id: 3, rollNo: '103', name: 'Rahul Kumar', marks: 78 },
      { id: 4, rollNo: '104', name: 'Neha Gupta', marks: 88 },
    ],
    'Annual': [
      { id: 1, rollNo: '101', name: 'Aarav Patel', marks: 88 },
      { id: 2, rollNo: '102', name: 'Priya Sharma', marks: 95 },
      { id: 3, rollNo: '103', name: 'Rahul Kumar', marks: 82 },
      { id: 4, rollNo: '104', name: 'Neha Gupta', marks: 90 },
    ],
  };

  useEffect(() => {
    // Deep copy to allow editing without mutating the original mock data
    setStudents(JSON.parse(JSON.stringify(mockMarksData[selectedExam] || mockMarksData['UT1'])));
  }, [selectedExam]);

  const maxMarks = selectedExam.includes('UT') ? 20 : 100;

  const handleMarkChange = (id, newMarks) => {
    setStudents(students.map(s => s.id === id ? { ...s, marks: newMarks } : s));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enter Marks</h1>
          <p className="text-sm text-gray-500 mt-1">Record and publish student grades for examinations.</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="10-A Mathematics">10-A Mathematics</option>
            <option value="12-B Physics">12-B Physics</option>
          </select>
          <select 
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="UT1">UT1 (Unit Test 1)</option>
            <option value="UT2">UT2 (Unit Test 2)</option>
            <option value="Half Yearly">Half Yearly</option>
            <option value="Annual">Annual</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <FileText className="h-5 w-5 mr-2 text-indigo-500" />
            Max Marks: <span className="font-bold text-gray-900 ml-1">{maxMarks}</span>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
            <Save className="h-4 w-4 mr-2" />
            Save Marks
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-24">Roll No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-48">Marks Obtained</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-32">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="number" 
                      value={student.marks}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                      max={maxMarks}
                      min="0"
                      className="w-full border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {student.marks !== '' ? (
                      <span className="inline-flex items-center text-emerald-600 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 mr-1" /> Entered
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
