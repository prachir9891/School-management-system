import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, DollarSign, CreditCard, Receipt, PlusCircle, CheckCircle, Clock } from 'lucide-react';

export default function AccountantCollection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [showSuccess, setShowSuccess] = useState(false);

  const students = [
    { id: 1, name: 'Aarav Patel', rollNo: '101', class: '10-A', pending: 450, total: 1200 },
    { id: 2, name: 'Priya Sharma', rollNo: '102', class: '10-A', pending: 0, total: 1200 },
  ];

  const [recentCollections, setRecentCollections] = useState([
    { id: 'REC-001', student: 'Rahul Kumar', class: '9-B', amount: 500, date: 'Today, 10:30 AM', mode: 'Cash' },
    { id: 'REC-002', student: 'Sneha Gupta', class: '8-A', amount: 300, date: 'Yesterday, 2:15 PM', mode: 'Card' },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Please enter a name or roll number to search.');
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const found = students.find(s => 
      s.rollNo.toLowerCase().includes(query) || 
      s.name.toLowerCase().includes(query)
    );
    
    if (found) {
      setSelectedStudent(found);
      setAmount(found.pending.toString());
    } else {
      setSelectedStudent(null);
      alert('No student found matching that search. Please try again.');
    }
  };

  const handleCollect = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      
      // Add to recent collections
      const newRec = {
        id: `REC-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        student: selectedStudent.name,
        class: selectedStudent.class,
        amount: parseInt(amount),
        date: 'Just now',
        mode: paymentMode
      };
      setRecentCollections([newRec, ...recentCollections]);
      
      setSelectedStudent(null);
      setSearchQuery('');
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fee Collection</h1>
        <p className="text-sm text-gray-500 mt-1">Search for a student and record fee payments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Find Student</h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Name or Roll No..." 
                    className="w-full pl-9 pr-4 py-2.5 border-gray-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
                Search Record
              </button>
            </form>
          </div>

          {!selectedStudent && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Select (Pending Dues)</h3>
              <div className="space-y-3">
                {students.filter(s => s.pending > 0).map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => {
                      setSelectedStudent(s);
                      setAmount(s.pending.toString());
                      setSearchQuery(s.name);
                    }}
                    className="p-3 border border-gray-100 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer flex justify-between items-center transition-all shadow-sm"
                  >
                    <div>
                      <div className="text-sm font-bold text-gray-900">{s.name}</div>
                      <div className="text-xs font-medium text-gray-500 mt-0.5">{s.class} • Roll: {s.rollNo}</div>
                    </div>
                    <div className="text-sm font-black text-rose-600">${s.pending}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedStudent && (
            <div className="bg-indigo-50 rounded-2xl shadow-sm border border-indigo-100 p-6">
              <h3 className="font-bold text-indigo-900 mb-4">Student Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Name</p>
                  <p className="text-base font-bold text-indigo-900">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Class & Roll No</p>
                  <p className="text-sm font-bold text-indigo-900">{selectedStudent.class} • {selectedStudent.rollNo}</p>
                </div>
                <div className="pt-3 border-t border-indigo-200/50">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Total Fee (Yearly)</p>
                  <p className="text-sm font-bold text-indigo-900">${selectedStudent.total}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">Pending Dues</p>
                  <p className="text-2xl font-black text-rose-600">${selectedStudent.pending}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                <DollarSign className="h-5 w-5 text-emerald-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Record Payment</h2>
            </div>
            
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
                <p className="text-sm text-gray-500 mt-2">Receipt has been generated and emailed to the parent.</p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Record Another Payment
                </button>
              </div>
            ) : !selectedStudent ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-6 text-gray-400">
                <Search className="h-12 w-12 mb-3 opacity-20" />
                <p className="font-medium">Search for a student to initiate fee collection.</p>
              </div>
            ) : selectedStudent.pending === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-6 text-emerald-600">
                <CheckCircle className="h-12 w-12 mb-3 opacity-50" />
                <p className="font-bold text-lg">No Pending Dues!</p>
                <p className="text-sm text-emerald-700 mt-1">This student has cleared all fees for the current term.</p>
              </div>
            ) : (
              <form onSubmit={handleCollect} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Amount to Collect ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      required
                      type="number" 
                      max={selectedStudent.pending}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-gray-200 rounded-xl text-lg font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Payment Mode</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Cash', 'Card', 'Bank Transfer'].map(mode => (
                      <div 
                        key={mode}
                        onClick={() => setPaymentMode(mode)}
                        className={`p-3 rounded-xl border text-center cursor-pointer font-semibold text-sm transition-all ${paymentMode === mode ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {mode}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-4">
                  <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Confirm & Collect ${amount || 0}
                  </button>
                  <button type="button" className="px-6 py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors shadow-sm flex items-center justify-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Generate Invoice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Recent Collections History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-indigo-600" /> Recent Collections
          </h3>
          <button 
            onClick={() => navigate('/accountant/history')} 
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View All History
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Receipt ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Mode</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {recentCollections.map((col, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">{col.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{col.student}</div>
                    <div className="text-xs text-gray-500">{col.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">${col.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs font-bold rounded-md bg-gray-100 text-gray-700">
                      {col.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{col.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
