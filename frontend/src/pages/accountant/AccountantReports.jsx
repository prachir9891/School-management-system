import { TrendingUp, BarChart3, PieChart, DollarSign } from 'lucide-react';

export default function AccountantReports() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Detailed breakdown of revenue, expenses, and targets.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl shadow-sm hover:bg-gray-50">
          Export as PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-indigo-500" /> Revenue vs Target (2026)
            </h3>
          </div>
          <div className="flex items-end justify-between h-64 space-x-4">
            {[
              { month: 'Jul', rev: 80, tgt: 85 },
              { month: 'Aug', rev: 95, tgt: 90 },
              { month: 'Sep', rev: 100, tgt: 95 },
              { month: 'Oct', rev: 60, tgt: 95 },
            ].map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 h-full">
                <div className="w-full flex justify-center items-end space-x-1 h-full">
                  <div className="w-1/3 bg-indigo-500 rounded-t-lg relative group" style={{ height: `${d.rev}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Rev</div>
                  </div>
                  <div className="w-1/3 bg-gray-200 rounded-t-lg relative group" style={{ height: `${d.tgt}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Tgt</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-500 mt-4 border-t w-full text-center pt-2">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-6 text-sm font-medium">
            <span className="flex items-center"><div className="w-3 h-3 bg-indigo-500 rounded-sm mr-2"></div> Actual Revenue</span>
            <span className="flex items-center"><div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div> Target</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center h-full">
            <PieChart className="h-16 w-16 text-emerald-500 mb-4 opacity-20" />
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Surplus YTD</h3>
            <span className="text-5xl font-black text-emerald-600">+$245K</span>
            <p className="text-sm font-bold text-emerald-500 mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> 18% margin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
