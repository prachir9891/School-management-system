import { useState } from 'react';
import { Search, Wallet, CheckCircle, Clock, Edit2, FileText, X, Printer, Download } from 'lucide-react';

export default function AccountantTeacherSalary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock initial data
  const [records, setRecords] = useState([
    {
      id: 'SAL-001',
      teacherId: 'T-101',
      teacherName: 'Rajesh Kumar',
      designation: 'Senior Mathematics Teacher',
      month: 'September 2026',
      basicSalary: 45000,
      allowances: 5000,
      deductions: 2000,
      totalSalary: 48000,
      paidAmount: 48000,
      pendingAmount: 0,
      status: 'Paid',
      paymentDate: '01 Sep 2026'
    },
    {
      id: 'SAL-002',
      teacherId: 'T-102',
      teacherName: 'Sneha Sharma',
      designation: 'Science Head',
      month: 'September 2026',
      basicSalary: 50000,
      allowances: 6000,
      deductions: 2500,
      totalSalary: 53500,
      paidAmount: 0,
      pendingAmount: 53500,
      status: 'Pending',
      paymentDate: null
    },
    {
      id: 'SAL-003',
      teacherId: 'T-103',
      teacherName: 'Vikram Singh',
      designation: 'Physical Education Teacher',
      month: 'August 2026',
      basicSalary: 35000,
      allowances: 3000,
      deductions: 1000,
      totalSalary: 37000,
      paidAmount: 37000,
      pendingAmount: 0,
      status: 'Paid',
      paymentDate: '02 Aug 2026'
    }
  ]);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          record.teacherId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = monthFilter === 'All' || record.month.includes(monthFilter);
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const handleMarkAsPaid = (id) => {
    setRecords(records.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          status: 'Paid',
          paidAmount: rec.totalSalary,
          pendingAmount: 0,
          paymentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };
      }
      return rec;
    }));
  };

  const handleOpenEdit = (record) => {
    setSelectedRecord({ ...record });
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    const numValue = Number(value) || 0;
    const updatedRecord = { ...selectedRecord, [field]: numValue };
    
    // Auto calculate
    updatedRecord.totalSalary = updatedRecord.basicSalary + updatedRecord.allowances - updatedRecord.deductions;
    
    if (updatedRecord.status === 'Pending') {
      updatedRecord.pendingAmount = updatedRecord.totalSalary - updatedRecord.paidAmount;
    } else {
      updatedRecord.paidAmount = updatedRecord.totalSalary;
    }

    setSelectedRecord(updatedRecord);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setRecords(records.map(rec => rec.id === selectedRecord.id ? selectedRecord : rec));
    setShowEditModal(false);
  };

  const handleOpenSlip = (record) => {
    setSelectedRecord(record);
    setShowSlipModal(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Salary</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, process, and generate salary slips for the teaching staff.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Teacher Name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select 
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
          >
            <option value="All">All Months</option>
            <option value="September">September</option>
            <option value="August">August</option>
            <option value="July">July</option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {record.teacherName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{record.teacherName}</div>
                        <div className="text-xs text-gray-500">{record.teacherId} • {record.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {record.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">₹{record.totalSalary.toLocaleString()}</div>
                    {record.status === 'Pending' && (
                      <div className="text-xs text-rose-500 font-semibold mt-0.5">Pending: ₹{record.pendingAmount.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {record.status === 'Paid' ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-3">
                      {record.status === 'Pending' && (
                        <button 
                          onClick={() => handleMarkAsPaid(record.id)}
                          className="text-emerald-600 hover:text-emerald-900 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button onClick={() => handleOpenSlip(record)} className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors" title="Salary Slip">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenEdit(record)} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Record">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <Wallet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-lg font-medium">No salary records found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">Edit Salary Record</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-rose-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={saveEdit} className="p-6 space-y-5">
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-2">
                <p className="text-sm font-bold text-indigo-900">{selectedRecord.teacherName} ({selectedRecord.teacherId})</p>
                <p className="text-xs text-indigo-700 mt-1">Month: {selectedRecord.month}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Basic Salary (₹)</label>
                  <input type="number" required value={selectedRecord.basicSalary} onChange={(e) => handleEditChange('basicSalary', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Allowances (₹)</label>
                  <input type="number" required value={selectedRecord.allowances} onChange={(e) => handleEditChange('allowances', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Deductions (₹)</label>
                  <input type="number" required value={selectedRecord.deductions} onChange={(e) => handleEditChange('deductions', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Total Net Salary (₹)</label>
                  <input type="number" disabled value={selectedRecord.totalSalary} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 font-bold text-gray-700 outline-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold rounded-xl transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Salary Slip Modal */}
      {showSlipModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="font-bold text-gray-900 text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" /> Salary Slip
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Print">
                  <Printer className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download PDF">
                  <Download className="w-5 h-5" />
                </button>
                <button onClick={() => setShowSlipModal(false)} className="ml-2 p-2 text-gray-400 hover:text-rose-600 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="text-center mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-black text-indigo-900 tracking-tight">EduManage School</h2>
                <p className="text-sm text-gray-500 mt-1">123 Education Lane, Learning City, 40001</p>
                <h3 className="text-lg font-bold text-gray-800 mt-4 uppercase tracking-widest">Salary Slip</h3>
                <p className="text-sm font-medium text-indigo-600">{selectedRecord.month}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 text-sm">
                <div><span className="text-gray-500">Employee Name:</span> <span className="font-bold text-gray-900">{selectedRecord.teacherName}</span></div>
                <div><span className="text-gray-500">Employee ID:</span> <span className="font-bold text-gray-900">{selectedRecord.teacherId}</span></div>
                <div><span className="text-gray-500">Designation:</span> <span className="font-bold text-gray-900">{selectedRecord.designation}</span></div>
                <div><span className="text-gray-500">Payment Status:</span> 
                  <span className={`ml-2 font-bold ${selectedRecord.status === 'Paid' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {selectedRecord.status} {selectedRecord.paymentDate && `(${selectedRecord.paymentDate})`}
                  </span>
                </div>
              </div>

              <table className="w-full text-sm border-collapse mb-8">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-left font-bold text-gray-700 w-1/2">Earnings</th>
                    <th className="py-3 px-4 text-right font-bold text-gray-700 w-1/2">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-600">Basic Salary</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{selectedRecord.basicSalary.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-600">Allowances</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{selectedRecord.allowances.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <th className="py-3 px-4 text-left font-bold text-gray-700">Gross Earnings</th>
                    <th className="py-3 px-4 text-right font-bold text-gray-900">{(selectedRecord.basicSalary + selectedRecord.allowances).toLocaleString()}</th>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-sm border-collapse mb-8">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-left font-bold text-gray-700 w-1/2">Deductions</th>
                    <th className="py-3 px-4 text-right font-bold text-gray-700 w-1/2">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-600">Taxes & Other Deductions</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{selectedRecord.deductions.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <th className="py-3 px-4 text-left font-bold text-gray-700">Total Deductions</th>
                    <th className="py-3 px-4 text-right font-bold text-gray-900">{selectedRecord.deductions.toLocaleString()}</th>
                  </tr>
                </tbody>
              </table>

              <div className="bg-indigo-50 rounded-xl p-6 flex justify-between items-center border border-indigo-100">
                <span className="text-lg font-bold text-indigo-900">Net Salary Payable</span>
                <span className="text-3xl font-black text-indigo-600">₹{selectedRecord.totalSalary.toLocaleString()}</span>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
                <div className="text-center">
                  <div className="w-40 border-b border-gray-400 mb-2"></div>
                  <p className="text-xs text-gray-500 font-medium">Employee Signature</p>
                </div>
                <div className="text-center">
                  <div className="w-40 border-b border-gray-400 mb-2"></div>
                  <p className="text-xs text-gray-500 font-medium">Director / Principal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
