import { useState } from 'react';
import { AlertTriangle, Send, Search, Filter, Check } from 'lucide-react';

export default function AccountantPending() {
  const [searchQuery, setSearchQuery] = useState('');

  const [defaulters, setDefaulters] = useState([
    { id: 1, name: 'Rahul Kumar', rollNo: '205', class: '12-B', amount: 1200, months: 3, parentPhone: '+1 555 1236', lastReminder: 'Oct 10', isSending: false, isSent: false },
    { id: 2, name: 'Neha Gupta', rollNo: '150', class: '11-C', amount: 800, months: 2, parentPhone: '+1 555 1237', lastReminder: 'Oct 15', isSending: false, isSent: false },
    { id: 3, name: 'Vikram Singh', rollNo: '045', class: '10-A', amount: 400, months: 1, parentPhone: '+1 555 1238', lastReminder: 'Never', isSending: false, isSent: false },
  ]);

  const filteredDefaulters = defaulters.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.rollNo.includes(searchQuery)
  );

  const handleRemind = (id) => {
    // Set isSending to true
    setDefaulters(prev => prev.map(student => 
      student.id === id ? { ...student, isSending: true } : student
    ));

    // Simulate sending delay
    setTimeout(() => {
      setDefaulters(prev => prev.map(student => 
        student.id === id ? { ...student, isSending: false, isSent: true, lastReminder: 'Just Now' } : student
      ));
      
      // Reset the sent state back to normal after 3 seconds
      setTimeout(() => {
        setDefaulters(prev => prev.map(student => 
          student.id === id ? { ...student, isSent: false } : student
        ));
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Fees</h1>
          <p className="text-sm text-gray-500 mt-1">Track outstanding dues and send payment reminders.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search student..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center shadow-sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start shadow-sm">
        <AlertTriangle className="h-5 w-5 text-rose-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-rose-900">Total Outstanding Amount: $2,400</h4>
          <p className="text-sm text-rose-700 mt-1">There are 3 students with dues pending for more than 1 month.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Amount</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Overdue By</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Reminder</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredDefaulters.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">No pending fees match your search.</td>
                </tr>
              ) : (
                filteredDefaulters.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{student.name}</div>
                      <div className="text-xs font-medium text-gray-500 mt-0.5">{student.class} • Roll: {student.rollNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-black text-rose-600">${student.amount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-rose-100 text-rose-800">
                        {student.months} Months
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                      {student.lastReminder === 'Just Now' ? (
                        <span className="text-emerald-600 font-bold">{student.lastReminder}</span>
                      ) : (
                        student.lastReminder
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleRemind(student.id)}
                        disabled={student.isSending || student.isSent}
                        className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                          student.isSent 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                            : student.isSending
                              ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed'
                              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-transparent'
                        }`}
                      >
                        {student.isSent ? (
                          <><Check className="h-4 w-4 mr-2" /> Sent!</>
                        ) : student.isSending ? (
                          <><Send className="h-4 w-4 mr-2 animate-bounce" /> Sending...</>
                        ) : (
                          <><Send className="h-4 w-4 mr-2" /> Send Reminder</>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
