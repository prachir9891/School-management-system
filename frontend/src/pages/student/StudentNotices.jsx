import { Bell, Clock, Info } from 'lucide-react';

export default function StudentNotices() {
  const notices = [
    { id: 1, title: 'Annual Sports Day Postponed', content: 'Due to expected heavy rainfall, the sports day has been moved to next Friday.', date: 'Today, 09:00 AM', type: 'Alert' },
    { id: 2, title: 'Science Fair Project Deadline', content: 'The final date to submit your science fair projects is November 15th. No extensions will be granted.', date: 'Yesterday', type: 'Academic' },
    { id: 3, title: 'Library Book Returns', content: 'Please return all books borrowed before the mid-term break by this Friday to avoid late fines.', date: 'Oct 10, 2026', type: 'General' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
        <p className="text-sm text-gray-500 mt-1">Official announcements and updates from the school.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <li key={notice.id} className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
              <div className={`p-3 rounded-xl mt-1 ${notice.type === 'Alert' ? 'bg-rose-50 text-rose-600' : notice.type === 'Academic' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {notice.type === 'Alert' ? <Bell className="h-6 w-6" /> : notice.type === 'Academic' ? <Info className="h-6 w-6" /> : <Bell className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-600 uppercase tracking-wider">
                      {notice.type}
                    </span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-gray-400">
                    <Clock className="h-3.5 w-3.5 mr-1" /> {notice.date}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">{notice.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
