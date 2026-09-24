import { useState } from 'react';
import { DollarSign, CheckCircle2, CreditCard, Receipt, AlertCircle } from 'lucide-react';

export default function ParentFees() {
  const [selectedChild, setSelectedChild] = useState('Aarav Patel');
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dues = {
    amount: 450,
    dueDate: 'Nov 01, 2026',
    description: 'Term 2 Tuition Fee'
  };

  const history = [
    { id: 'REC-2026-090', date: 'Jul 15, 2026', amount: '$450', desc: 'Term 1 Tuition Fee', status: 'Paid' },
    { id: 'REC-2026-001', date: 'Apr 01, 2026', amount: '$300', desc: 'Annual Charges & Library', status: 'Paid' },
  ];

  const handlePay = (e) => {
    e.preventDefault();
    setShowPayment(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Status</h1>
          <p className="text-sm text-gray-500 mt-1">View pending dues, make payments, and download receipts.</p>
        </div>
        <select 
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="border-gray-200 rounded-xl text-sm focus:ring-indigo-500 font-semibold shadow-sm"
        >
          <option value="Aarav Patel">👦 Aarav Patel (10-A)</option>
        </select>
      </div>

      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
          <p className="text-sm font-bold text-emerald-900">Payment Successful! A receipt has been sent to your email.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-rose-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <DollarSign className="absolute -right-4 -bottom-4 h-32 w-32 text-rose-500 opacity-50" />
            <h3 className="text-sm font-bold text-rose-200 uppercase tracking-wider mb-2">Pending Dues</h3>
            <p className="text-5xl font-black relative z-10">${dues.amount}</p>
            <div className="mt-4 pt-4 border-t border-rose-500/50 relative z-10">
              <p className="text-sm font-medium text-rose-100">{dues.description}</p>
              <p className="text-sm font-bold text-white flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1.5" /> Due by {dues.dueDate}
              </p>
            </div>
            <button 
              onClick={() => setShowPayment(true)}
              className="mt-6 w-full py-3 bg-white text-rose-600 text-sm font-black rounded-xl hover:bg-gray-50 transition-colors shadow-sm relative z-10 flex items-center justify-center"
            >
              <CreditCard className="h-5 w-5 mr-2" /> Pay Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {history.map((item, index) => (
                <li key={index} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-xl mr-4 text-emerald-600">
                      <Receipt className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{item.desc}</p>
                      <p className="text-sm font-medium text-gray-500 mt-1">Paid on {item.date} • {item.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">{item.amount}</p>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mt-1">Download</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mock Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">Secure Payment Checkout</h3>
              <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-rose-600">×</button>
            </div>
            <form onSubmit={handlePay} className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 flex justify-between items-center">
                <span className="font-bold text-gray-600">Total to Pay</span>
                <span className="text-2xl font-black text-indigo-600">${dues.amount}</span>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                <input required type="text" placeholder="1234 5678 9101 1121" className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <input required type="text" placeholder="12/28" className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">CVC</label>
                  <input required type="text" placeholder="***" className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
              </div>
              <div className="pt-4 mt-2">
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 flex justify-center items-center">
                  <CreditCard className="h-5 w-5 mr-2" /> Pay ${dues.amount}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
