import { useState } from 'react';
import { DollarSign, Clock, TrendingDown, Receipt, X, CheckCircle, FileText } from 'lucide-react';

export default function AccountantPanel() {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [invoiceData, setInvoiceData] = useState({ studentId: '', amount: '', description: '' });

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowInvoiceModal(false);
      setInvoiceData({ studentId: '', amount: '', description: '' });
    }, 2000);
  };

  const stats = [
    { title: 'Total Collected (Month)', value: '₹14,50,000', icon: DollarSign, color: 'bg-emerald-500' },
    { title: 'Pending Dues', value: '₹3,20,000', icon: Clock, color: 'bg-rose-500' },
    { title: 'Total Expenses', value: '₹4,10,000', icon: TrendingDown, color: 'bg-amber-500' },
  ];

  const recentTransactions = [
    { id: 'TRX-9823', student: 'Aarav (8-A)', amount: '₹12,500', date: 'Today', status: 'Completed' },
    { id: 'TRX-9824', student: 'Priya (10-B)', amount: '₹15,000', date: 'Today', status: 'Completed' },
    { id: 'TRX-9822', student: 'Rahul (6-C)', amount: '₹10,000', date: 'Yesterday', status: 'Failed' },
  ];

  const ledgerData = [
    { date: '2026-09-20', id: 'TRX-9824', desc: 'Fee Collection - Priya', credit: '₹15,000', debit: '-', bal: '₹14,50,000' },
    { date: '2026-09-20', id: 'TRX-9823', desc: 'Fee Collection - Aarav', credit: '₹12,500', debit: '-', bal: '₹14,35,000' },
    { date: '2026-09-19', id: 'EXP-104', desc: 'Stationery Supplies', credit: '-', debit: '₹2,500', bal: '₹14,22,500' },
    { date: '2026-09-18', id: 'TRX-9822', desc: 'Fee Collection - Rahul (Failed)', credit: '-', debit: '-', bal: '₹14,25,000' },
    { date: '2026-09-15', id: 'EXP-103', desc: 'Electricity Bill', credit: '-', debit: '₹12,000', bal: '₹14,25,000' },
    { date: '2026-09-14', id: 'TRX-9821', desc: 'Fee Collection - Neha', credit: '₹8,000', debit: '-', bal: '₹14,37,000' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Finance & Accounts</h1>
        <p className="text-sm text-gray-500 mt-1">Manage fee collections, pending dues, and financial reports.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
              <div className={`${stat.color} p-4 rounded-xl text-white mr-5 shadow-inner`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Receipt className="mr-2 h-5 w-5 text-gray-400" /> Recent Receipts
            </h3>
            <button 
              onClick={() => setShowLedger(true)} 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View Ledger
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{tx.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.student}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</h2>
          <button 
            onClick={() => setShowInvoiceModal(true)}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Generate Fee Invoice
          </button>
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Send Payment Reminders
          </button>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Pending Fee Alerts</h3>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start">
              <Clock className="h-5 w-5 text-rose-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-rose-800">45 Students</p>
                <p className="text-xs text-rose-600 mt-1">Have pending fees exceeding 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">Generate Fee Invoice</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-rose-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Invoice Generated!</h3>
                <p className="text-sm text-gray-500 mt-2">The fee invoice has been created and sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleGenerateInvoice} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Student ID / Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. 101 or Aarav Patel"
                    value={invoiceData.studentId} 
                    onChange={(e) => setInvoiceData({...invoiceData, studentId: e.target.value})} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Term 2 Tuition Fee"
                    value={invoiceData.description} 
                    onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Amount (₹)</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="0.00"
                    value={invoiceData.amount} 
                    onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})} 
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold rounded-xl transition-colors">
                    Generate
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Ledger Modal */}
      {showLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                Detailed Ledger
              </h3>
              <button onClick={() => setShowLedger(false)} className="text-gray-400 hover:text-rose-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Credit</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Debit</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ledgerData.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{row.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">{row.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{row.desc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600 text-right">{row.credit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-rose-600 text-right">{row.debit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-900 text-right">{row.bal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setShowLedger(false)} 
                className="px-6 py-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-sm font-bold rounded-xl shadow-sm transition-colors"
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
