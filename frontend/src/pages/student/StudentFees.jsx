import React, { useMemo } from 'react';
import { CreditCard, Receipt, Clock, FileText, AlertCircle } from 'lucide-react';

// Simulated Current Date for demonstration (February 6, 2027)
const CURRENT_DATE = new Date('2027-02-06T00:00:00');

// Raw chronological data
const rawMonthlyFees = [
  { id: 1, month: 'January 2027', baseFee: 2000, paidAmount: 1000, dueDate: '2027-01-03T00:00:00' },
  { id: 2, month: 'February 2027', baseFee: 2000, paidAmount: 0, dueDate: '2027-02-03T00:00:00' },
  { id: 3, month: 'March 2027', baseFee: 2000, paidAmount: 0, dueDate: '2027-03-03T00:00:00' },
];

const additionalCharges = [
  { id: 1, name: 'Exam Fee', amount: 1500, status: 'Paid', dueDate: 'Sep 15, 2026' },
  { id: 2, name: 'Transport Fee', amount: 2000, status: 'Pending', dueDate: 'Nov 05, 2026' },
  { id: 3, name: 'Activity Fee', amount: 500, status: 'Paid', dueDate: 'Aug 20, 2026' },
  { id: 4, name: 'Annual Function Charge', amount: 1000, status: 'Pending', dueDate: 'Nov 15, 2026' },
  { id: 5, name: 'Other School Charges', amount: 300, status: 'Pending', dueDate: 'Dec 01, 2026' },
];

const paymentHistory = [
  { id: 'TXN-98234', date: 'Jan 10, 2027', amount: 1000, purpose: 'January 2027 Fee (Partial)', method: 'UPI' },
  { id: 'TXN-87421', date: 'Sep 09, 2026', amount: 6500, purpose: 'September 2026 + Exam Fee', method: 'UPI' },
  { id: 'TXN-76123', date: 'Aug 10, 2026', amount: 5500, purpose: 'August 2026 + Activity Fee', method: 'Bank Transfer' },
  { id: 'TXN-65890', date: 'Jul 15, 2026', amount: 15000, purpose: 'Q1 (Apr-Jun) Fee', method: 'Cash' },
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Overdue': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'Upcoming': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'Partial': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function StudentFees() {
  
  // Dynamic Calculation Logic
  const calculatedMonthlyFees = useMemo(() => {
    let previousPending = 0;
    
    return rawMonthlyFees.map((fee) => {
      const dueDateObj = new Date(fee.dueDate);
      let lateCharge = 0;
      let isLate = false;
      
      let daysLate = 0;
      
      // Calculate Late Fee (₹50 per day past the 3rd)
      if (CURRENT_DATE > dueDateObj) {
        const timeDiff = CURRENT_DATE.getTime() - dueDateObj.getTime();
        daysLate = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Only apply late fee if the amount wasn't fully paid
        if (fee.paidAmount < (fee.baseFee + previousPending)) {
          lateCharge = daysLate * 50;
          isLate = true;
        }
      }

      const totalPayable = fee.baseFee + previousPending + lateCharge;
      const remainingPending = totalPayable - fee.paidAmount;
      
      let status = 'Upcoming';
      if (remainingPending <= 0) {
        status = 'Paid';
      } else if (isLate) {
        status = 'Overdue';
      } else if (fee.paidAmount > 0) {
        status = 'Partial';
      } else {
        status = 'Pending';
      }

      const row = {
        ...fee,
        previousPending,
        lateCharge,
        daysLate,
        totalPayable,
        remainingPending,
        status,
        dueDateFormatted: dueDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      // Carry forward to next month
      previousPending = remainingPending;
      
      return row;
    });
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Details</h1>
          <p className="text-sm text-gray-500 mt-1">Simulated Date: {CURRENT_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <button className="flex items-center px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          <CreditCard className="w-4 h-4 mr-2" />
          Pay Now
        </button>
      </div>

      {/* Monthly Fees - Primary Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-500" /> Monthly Fees
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Month</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Current Month Fee</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Prev. Pending</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Late Charge</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50/30">Total Payable</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Paid Amount</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {calculatedMonthlyFees.map((fee) => (
                <React.Fragment key={fee.id}>
                  <tr className={`transition-colors ${fee.lateCharge > 0 ? 'bg-rose-50/20' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-gray-900">{fee.month}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">Due: {fee.dueDateFormatted}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 text-right">
                      ₹{fee.baseFee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 text-right">
                      {fee.previousPending > 0 ? `₹${fee.previousPending.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-rose-500 text-right">
                      {fee.lateCharge > 0 ? `+ ₹${fee.lateCharge.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-indigo-700 text-right bg-indigo-50/30">
                      ₹{fee.totalPayable.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600 text-right">
                      {fee.paidAmount > 0 ? `₹${fee.paidAmount.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(fee.status)}`}>
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                  {fee.lateCharge > 0 && (
                    <tr className="bg-rose-50/40">
                      <td colSpan="7" className="px-6 py-3 border-t border-rose-100">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-rose-800">
                          <div className="flex items-center font-black uppercase tracking-wider text-rose-900">
                            <AlertCircle className="w-4 h-4 mr-1.5 text-rose-600" />
                            Late Fee Breakdown
                          </div>
                          <div className="flex items-center gap-4 font-medium opacity-90 ml-2">
                            <span>Due Date: <strong className="text-rose-900">3rd</strong></span>
                            <span>Payment Date: <strong className="text-rose-900">Unpaid (as of {CURRENT_DATE.getDate()}th)</strong></span>
                            <span>Total Late Days: <strong className="text-rose-900">{fee.daysLate} days</strong></span>
                            <span>Rate: <strong className="text-rose-900">₹50/day</strong></span>
                            <span className="font-bold border-l border-rose-200 pl-4">Total Late Charge: <strong className="text-rose-900">₹{fee.lateCharge.toLocaleString()}</strong></span>
                            <span className="font-bold border-l border-rose-200 pl-4">Final Payable: <strong className="text-rose-900">₹{fee.totalPayable.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Charges Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-indigo-500" /> Additional Charges
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Charge Name</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {additionalCharges.map((charge) => (
                <tr key={charge.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {charge.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-700 text-right">
                    ₹{charge.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {charge.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(charge.status)}`}>
                      {charge.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-indigo-500" /> Payment History
          </h2>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Download Statement</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Purpose</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Method</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.purpose}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-700 text-right">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Receipt className="h-4 w-4 mx-auto" />
                    </button>
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
