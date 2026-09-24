import { BookOpen, Download, FileText, Search } from 'lucide-react';

export default function StudentMaterial() {
  const materials = [
    { id: 1, subject: 'Mathematics', title: 'Chapter 2: Quadratic Equations Notes', type: 'PDF', size: '2.4 MB', date: 'Oct 20, 2026' },
    { id: 2, subject: 'Physics', title: 'Formula Sheet - Term 1', type: 'PDF', size: '1.1 MB', date: 'Oct 15, 2026' },
    { id: 3, subject: 'English', title: 'Shakespeare Summary', type: 'DOCX', size: '0.8 MB', date: 'Oct 10, 2026' },
    { id: 4, subject: 'Chemistry', title: 'Periodic Table High-Res', type: 'IMG', size: '4.5 MB', date: 'Sep 25, 2026' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Material</h1>
          <p className="text-sm text-gray-500 mt-1">Download notes, syllabus, and revision materials.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search materials..." 
            className="w-full pl-9 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl">
                {item.type === 'PDF' ? <FileText className="h-6 w-6 text-indigo-600" /> : <BookOpen className="h-6 w-6 text-indigo-600" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <div className="flex items-center mt-1 space-x-3 text-xs font-medium text-gray-500">
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">{item.subject}</span>
                  <span>{item.type}</span>
                  <span>{item.size}</span>
                </div>
              </div>
            </div>
            <button className="h-10 w-10 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-gray-400 rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
