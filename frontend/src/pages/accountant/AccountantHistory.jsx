import { ArrowDownLeft, ArrowUpRight, Search, Calendar } from 'lucide-react';

export default function AccountantHistory() {
  const transactions = [
    { id: 'TRX-9001', type: 'Credit', category: 'Fee Collection', description: 'Tuition Fee - Aarav Patel', amount: '+$450.00', date: 'Oct 24, 2026, 10:30 AM' },
    { id: 'TRX-9002', type: 'Debit', category: 'Vendor Payment', description: 'Office Supplies - Staples', amount: '-$120.50', date: 'Oct 23, 2026, 02:15 PM' },
    { id: 'TRX-9003', type: 'Credit', category: 'Fee Collection', description: 'Term 1 Fee - Priya Sharma', amount: '+$1,200.00', date: 'Oct 22, 2026, 09:45 AM' },
    { id: 'TRX-9004', type: 'Debit', category: 'Utility', description: 'Electricity Bill - City Power', amount: '-$450.00', date: 'Oct 20, 2026, 11:00 AM' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-sm text-gray-500 mt-1">Complete ledger of all incoming and outgoing funds.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search description or ID..." 
              className="w-full pl-9 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:border-indigo-500 shadow-sm"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl flex items-center shadow-sm">
            <Calendar className="h-4 w-4 mr-2" /> Date Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{trx.id}</span>
                    <span className={`ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${trx.type === 'Credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {trx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{trx.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {trx.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end text-base font-black ${trx.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {trx.type === 'Credit' ? <ArrowDownLeft className="h-4 w-4 mr-1" /> : <ArrowUpRight className="h-4 w-4 mr-1" />}
                      {trx.amount}
                    </div>
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
