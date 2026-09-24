import { useState } from 'react';
import { Plus, Bell, Clock, Users, X, Send } from 'lucide-react';

export default function PrincipalNotices() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', audience: 'All' });
  
  const [notices, setNotices] = useState([
    { id: 1, title: 'Annual Sports Day Postponed', content: 'Due to expected heavy rainfall, the sports day has been moved to next Friday.', date: 'Today, 09:00 AM', audience: 'All' },
    { id: 2, staffOnly: true, title: 'Staff Meeting at 3 PM', content: 'Mandatory staff meeting in the main hall to discuss term 2 syllabus completion.', date: 'Yesterday', audience: 'Teachers' },
  ]);

  const handlePublish = (e) => {
    e.preventDefault();
    const newNotice = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      date: 'Just now',
      audience: formData.audience
    };
    setNotices([newNotice, ...notices]);
    setShowForm(false);
    setFormData({ title: '', content: '', audience: 'All' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Notices</h1>
          <p className="text-sm text-gray-500 mt-1">Publish and manage official announcements.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Publish Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <li key={notice.id} className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
              <div className={`p-3 rounded-xl mt-1 ${notice.audience === 'Teachers' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                {notice.audience === 'Teachers' ? <Users className="h-6 w-6" /> : <Bell className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-gray-100 text-gray-600 uppercase tracking-wider">
                      Audience: {notice.audience}
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

      {/* Publish Notice Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900 text-lg">Publish New Notice</h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handlePublish} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Notice Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g. Annual Holiday Announcement" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Target Audience</label>
                <select value={formData.audience} onChange={(e) => setFormData({...formData, audience: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="All">All (Students, Parents, Teachers)</option>
                  <option value="Teachers">Teachers Only</option>
                  <option value="Parents">Parents Only</option>
                  <option value="Students">Students Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
                <textarea required rows="4" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Type the official announcement here..."></textarea>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center">
                  <Send className="h-4 w-4 mr-2" /> Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
