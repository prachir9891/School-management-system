import { TrendingUp, Users, Target, BookOpen } from 'lucide-react';

export default function PrincipalAnalytics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">High-level academic and operational metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Enrollment', value: '1,245', trend: '+5.2%', positive: true, icon: Users, color: 'indigo' },
          { label: 'Avg Attendance', value: '94.2%', trend: '+1.1%', positive: true, icon: Target, color: 'emerald' },
          { label: 'Overall Pass Rate', value: '88.5%', trend: '-0.5%', positive: false, icon: TrendingUp, color: 'rose' },
          { label: 'Active Courses', value: '42', trend: '+2', positive: true, icon: BookOpen, color: 'amber' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${stat.color}-50 rounded-lg text-${stat.color}-600`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend (Mock CSS Chart) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Attendance Trends (Last 6 Months)</h3>
          <div className="flex items-end justify-between h-48 space-x-2">
            {[
              { month: 'Apr', val: 92 },
              { month: 'May', val: 95 },
              { month: 'Jun', val: 96 },
              { month: 'Jul', val: 89 },
              { month: 'Aug', val: 93 },
              { month: 'Sep', val: 94 },
            ].map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="w-full flex justify-center mb-2">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{d.val}%</div>
                </div>
                <div className="w-full bg-indigo-100 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${d.val}%` }}></div>
                </div>
                <div className="text-xs font-bold text-gray-500 mt-3">{d.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Department Average Scores</h3>
          <div className="space-y-6">
            {[
              { dept: 'Science', score: 86, color: 'bg-emerald-500' },
              { dept: 'Mathematics', score: 79, color: 'bg-indigo-500' },
              { dept: 'English Literature', score: 92, color: 'bg-amber-500' },
              { dept: 'Social Studies', score: 84, color: 'bg-rose-500' },
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-gray-700">{d.dept}</span>
                  <span className="font-bold text-gray-900">{d.score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
