import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

export default function ParentEvents() {
  const events = [
    { id: 1, title: 'Term 1 Parent-Teacher Meeting', date: 'Nov 10, 2026', time: '10:00 AM - 02:00 PM', location: 'School Main Hall', type: 'PTM' },
    { id: 2, title: 'Annual Sports Day', date: 'Nov 25, 2026', time: '08:00 AM - 04:00 PM', location: 'City Stadium', type: 'Sports' },
    { id: 3, title: 'Science Exhibition', date: 'Dec 05, 2026', time: '09:00 AM - 01:00 PM', location: 'Science Block', type: 'Academic' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Events</h1>
        <p className="text-sm text-gray-500 mt-1">Upcoming events, meetings, and activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
              <div className="bg-indigo-600 text-white p-6 md:w-48 flex flex-col items-center justify-center border-r border-indigo-700">
                <span className="text-sm font-bold uppercase tracking-wider opacity-80">{evt.date.split(' ')[0]}</span>
                <span className="text-4xl font-black">{evt.date.split(' ')[1].replace(',', '')}</span>
                <span className="text-sm font-bold mt-1 opacity-80">{evt.date.split(' ')[2]}</span>
              </div>
              <div className="p-6 flex-1 bg-white relative">
                <span className="absolute top-6 right-6 px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                  {evt.type}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pr-16">{evt.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm font-medium text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-500" /> {evt.time}
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-500" /> {evt.location}
                  </div>
                </div>
                {evt.type === 'PTM' && (
                  <button className="mt-6 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-100 transition-colors flex items-center">
                    Book Slot <ArrowRight className="h-4 w-4 ml-1.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" /> Upcoming PTMs
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Parent-Teacher Meetings are crucial for discussing your child's academic progress. Booking slots online is mandatory.
            </p>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm font-bold text-amber-800 mb-1">Booking Opens</p>
              <p className="text-xs text-amber-700">Nov 1, 2026 at 09:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
