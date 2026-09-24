import { useState } from 'react';
import { Users, GraduationCap, CalendarCheck, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { name: 'Mon', attendance: 96 },
  { name: 'Tue', attendance: 95 },
  { name: 'Wed', attendance: 97 },
  { name: 'Thu', attendance: 98 },
  { name: 'Fri', attendance: 94 },
];

const feeData = [
  { name: 'Collected', value: 400000 },
  { name: 'Pending', value: 120000 },
];
const COLORS = ['#10b981', '#f43f5e'];

export default function PrincipalPanel() {
  const [showAllApprovals, setShowAllApprovals] = useState(false);
  const [showAllNotices, setShowAllNotices] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, type: 'Leave Request', name: 'Sarah Jenkins (Teacher)', date: 'Today' },
    { id: 2, type: 'Event Approval', name: 'Science Fair 2026', date: 'Yesterday' },
    { id: 3, type: 'Budget Approval', name: 'New Lab Equipment', date: '2 Days Ago' },
    { id: 4, type: 'Leave Request', name: 'Mark Davis (Teacher)', date: '3 Days Ago' },
    { id: 5, type: 'Maintenance Request', name: 'Auditorium Repair', date: '5 Days Ago' },
  ]);

  const stats = [
    { title: 'Total Students', value: '2,543', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Teachers', value: '124', icon: GraduationCap, color: 'bg-indigo-500' },
    { title: 'Average Attendance', value: '96.5%', icon: CalendarCheck, color: 'bg-emerald-500' },
    { title: 'Total Revenue', value: '$520k', icon: DollarSign, color: 'bg-purple-500' },
  ];

  const allRecentNotices = [
    { id: 1, title: 'Term 1 Examinations Schedule', date: 'Oct 20, 2026' },
    { id: 2, title: 'Parent-Teacher Meeting', date: 'Nov 05, 2026' },
    { id: 3, title: 'Annual Sports Day Announcement', date: 'Nov 12, 2026' },
    { id: 4, title: 'Winter Vacation Schedule', date: 'Nov 15, 2026' },
    { id: 5, title: 'Staff Development Workshop', date: 'Nov 20, 2026' },
  ];

  const handleAction = (id) => {
    setPendingApprovals(pendingApprovals.filter(approval => approval.id !== id));
  };

  const displayedApprovals = showAllApprovals ? pendingApprovals : pendingApprovals.slice(0, 2);
  const displayedNotices = showAllNotices ? allRecentNotices : allRecentNotices.slice(0, 2);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Principal's Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Management-level overview of school operations.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Attendance Area Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">School-wide Attendance (This Week)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Fee Overview</h2>
          <div className="flex-1 flex items-center justify-center -mt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={feeData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></span>
              <span className="text-sm text-gray-600">Collected</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-rose-500 mr-2"></span>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 items-start">
        {/* Approvals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-amber-500" /> Pending Approvals
              {pendingApprovals.length > 0 && (
                <span className="ml-2 bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingApprovals.length}
                </span>
              )}
            </h3>
            <button 
              onClick={() => setShowAllApprovals(!showAllApprovals)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {showAllApprovals ? 'Show Less' : 'Review All'}
            </button>
          </div>
          <ul className={`divide-y divide-gray-50 flex-1 ${showAllApprovals ? 'overflow-y-auto max-h-[300px]' : ''}`}>
            {displayedApprovals.length > 0 ? (
              displayedApprovals.map((approval) => (
                <li key={approval.id} className="p-6 hover:bg-gray-50/50 transition-colors flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{approval.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{approval.name} &bull; {approval.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleAction(approval.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(approval.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Deny
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-6 text-center text-sm text-gray-500 font-medium">No pending approvals!</li>
            )}
          </ul>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-indigo-500" /> Recent Notices
            </h3>
            <button 
              onClick={() => setShowAllNotices(!showAllNotices)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {showAllNotices ? 'Show Less' : 'Manage'}
            </button>
          </div>
          <ul className={`divide-y divide-gray-50 flex-1 ${showAllNotices ? 'overflow-y-auto max-h-[300px]' : ''}`}>
            {displayedNotices.map((notice) => (
              <li key={notice.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <p className="text-sm font-bold text-gray-900">{notice.title}</p>
                <p className="text-xs text-gray-500 mt-1">Published on {notice.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
