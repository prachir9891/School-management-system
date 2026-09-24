import { useState } from 'react';
import { DollarSign, ArrowUpRight, CreditCard, AlertCircle, Phone, Search, FileText } from 'lucide-react';

export default function PrincipalFees() {
  const [searchQuery, setSearchQuery] = useState('');

  const defaulters = [
    { id: 1, name: 'Rahul Kumar', class: '12-B', amount: '$1,200', months: 3, parentPhone: '+1 555 1236' },
    { id: 2, name: 'Neha Gupta', class: '11-C', amount: '$800', months: 2, parentPhone: '+1 555 1237' },
    { id: 3, name: 'Vikram Singh', class: '10-A', amount: '$400', months: 1, parentPhone: '+1 555 1238' },
  ];

  const feeRecords = [
    { id: 1, name: 'Aarav Patel', rollNo: '101', class: '10-A', totalFee: 1200, paid: 750, pending: 450, status: 'Partial' },
    { id: 2, name: 'Priya Sharma', rollNo: '102', class: '10-A', totalFee: 1200, paid: 1200, pending: 0, status: 'Clear' },
    { id: 3, name: 'Rahul Kumar', rollNo: '205', class: '12-B', totalFee: 1500, paid: 300, pending: 1200, status: 'Defaulter' },
    { id: 4, name: 'Neha Gupta', rollNo: '150', class: '11-C', totalFee: 1400, paid: 600, pending: 800, status: 'Partial' },
  ];

  const filteredRecords = feeRecords.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.rollNo.includes(searchQuery)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p className="text-sm text-gray-500 mt-1">High-level view of school revenue and pending dues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue YTD</h3>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className="text-4xl font-black text-gray-900">$1.2M</span>
            <span className="text-sm font-medium text-emerald-500 mb-1 flex items-center"><ArrowUpRight className="h-4 w-4 mr-0.5" /> 12%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pending Dues</h3>
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600"><AlertCircle className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className="text-4xl font-black text-gray-900">$45.5K</span>
            <span className="text-sm font-medium text-rose-500 mb-1 flex items-center"><ArrowUpRight className="h-4 w-4 mr-0.5" /> 5%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Collection Rate</h3>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><CreditCard className="h-5 w-5" /></div>
          </div>
          <div className="flex items-end space-x-3">
            <span className="text-4xl font-black text-gray-900">92%</span>
            <span className="text-sm font-medium text-emerald-500 mb-1 flex items-center"><ArrowUpRight className="h-4 w-4 mr-0.5" /> 2%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending by Class */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full max-h-[400px]">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Pending Dues by Grade</h3>
          <div className="space-y-6 overflow-y-auto pr-2 flex-1">
            {[
              { grade: '12th Grade', amount: '$12,400', percent: 85, color: 'bg-rose-500' },
              { grade: '11th Grade', amount: '$9,200', percent: 65, color: 'bg-amber-500' },
              { grade: '10th Grade', amount: '$15,100', percent: 95, color: 'bg-indigo-500' },
              { grade: '9th Grade', amount: '$8,800', percent: 55, color: 'bg-emerald-500' },
              { grade: '8th Grade', amount: '$6,500', percent: 45, color: 'bg-blue-500' },
              { grade: '7th Grade', amount: '$5,200', percent: 35, color: 'bg-teal-500' },
              { grade: '6th Grade', amount: '$7,100', percent: 40, color: 'bg-cyan-500' },
              { grade: '5th Grade', amount: '$4,300', percent: 25, color: 'bg-purple-500' },
              { grade: '4th Grade', amount: '$3,800', percent: 20, color: 'bg-pink-500' },
              { grade: '3rd Grade', amount: '$2,900', percent: 15, color: 'bg-orange-500' },
              { grade: '2nd Grade', amount: '$3,100', percent: 18, color: 'bg-yellow-500' },
              { grade: '1st Grade', amount: '$2,500', percent: 12, color: 'bg-green-500' },
              { grade: 'UKG', amount: '$1,800', percent: 10, color: 'bg-emerald-400' },
              { grade: 'LKG', amount: '$1,500', percent: 8, color: 'bg-indigo-400' },
              { grade: 'Nursery', amount: '$1,200', percent: 5, color: 'bg-blue-400' },
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-gray-700">{d.grade}</span>
                  <span className="font-bold text-gray-900">{d.amount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Defaulters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Action Required: Top Defaulters</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <ul className="divide-y divide-gray-100">
              {defaulters.map((student) => (
                <li key={student.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{student.name} <span className="text-xs text-gray-500 font-medium ml-1">({student.class})</span></p>
                    <p className="text-xs font-medium text-rose-600 mt-1">Due: {student.amount} ({student.months} months)</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center" title="Call Parent">
                    <Phone className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* New Section: All Student Fee Records */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-indigo-500" /> Student Fee Records
          </h2>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or roll no..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:border-indigo-500 shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total Fee</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Paid Amount</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Dues</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-medium">No records found matching your search.</td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{record.name}</div>
                      <div className="text-xs font-medium text-gray-500 mt-0.5">{record.class} • Roll: {record.rollNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-gray-900">${record.totalFee}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-emerald-600">${record.paid}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-bold ${record.pending > 0 ? 'text-rose-600' : 'text-gray-400'}`}>
                        ${record.pending}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-1 inline-flex text-[10px] font-bold rounded-full uppercase tracking-wider ${
                        record.status === 'Clear' ? 'bg-emerald-100 text-emerald-700' : 
                        record.status === 'Defaulter' ? 'bg-rose-100 text-rose-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {record.status}
                      </span>
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
