import { useState, useMemo, useEffect } from 'react';
import { Target, AlertCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, Umbrella, Save, Edit3 } from 'lucide-react';

// Generate 12 months of realistic attendance data for mock purposes
const generateYearlyAttendance = () => {
  const months = [];
  
  for (let m = 0; m < 12; m++) {
    // Academic year starting June 2026
    const currentDate = new Date(2026, 5 + m, 1);
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const dayOfWeek = date.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const rand = Math.random();
      let status = 'Upcoming';
      if (m < 5) {
        if (rand > 0.95) status = 'A';
        else if (rand > 0.90) status = 'L';
        else status = 'P';
      }

      days.push({
        date: d,
        dayStr: date.toLocaleString('default', { weekday: 'short' }),
        status
      });
    }

    months.push({ monthName, days });
  }

  return months;
};

// Initial mock data
const initialStudentsMockData = {
  1: { name: 'Aarav Patel', rollNo: '101', months: generateYearlyAttendance() },
  2: { name: 'Priya Sharma', rollNo: '102', months: generateYearlyAttendance() },
  3: { name: 'Rohan Kumar', rollNo: '103', months: generateYearlyAttendance() },
};

export default function TeacherAttendance() {
  const [studentsData, setStudentsData] = useState(initialStudentsMockData);
  const [selectedStudentId, setSelectedStudentId] = useState(1);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // Starts around October 2026
  const [remark, setRemark] = useState('');
  
  // Track which day is currently being edited
  const [editingDate, setEditingDate] = useState(null); // { monthIdx, dayIdx }

  // Close popup if clicking anywhere else
  useEffect(() => {
    const handleClickOutside = () => setEditingDate(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const activeStudent = studentsData[selectedStudentId];
  const currentMonth = activeStudent.months[currentMonthIndex];

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
    setEditingDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
    setEditingDate(null);
  };

  const handleStatusChange = (studentId, monthIdx, dayIdx, newStatus) => {
    setStudentsData((prev) => {
      const newData = { ...prev };
      
      const studentCopy = { ...newData[studentId] };
      const monthsCopy = [...studentCopy.months];
      const monthCopy = { ...monthsCopy[monthIdx] };
      const daysCopy = [...monthCopy.days];
      const dayCopy = { ...daysCopy[dayIdx], status: newStatus };
      
      daysCopy[dayIdx] = dayCopy;
      monthCopy.days = daysCopy;
      monthsCopy[monthIdx] = monthCopy;
      studentCopy.months = monthsCopy;
      newData[studentId] = studentCopy;

      return newData;
    });
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'P': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'A': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'L': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Upcoming': return 'bg-white text-gray-900 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'P': return 'Present';
      case 'A': return 'Absent';
      case 'L': return 'Late';
      case 'Upcoming': return '-';
      default: return 'Unknown';
    }
  };

  // Calculate yearly stats
  const yearlyStats = useMemo(() => {
    let present = 0, absent = 0, late = 0, totalWorking = 0;
    activeStudent.months.forEach(m => {
      m.days.forEach(day => {
        if (day.status !== 'Upcoming') {
          totalWorking++;
          if (day.status === 'P') present++;
          else if (day.status === 'A') absent++;
          else if (day.status === 'L') late++;
        }
      });
    });
    const percent = totalWorking === 0 ? 0 : (((present + late) / totalWorking) * 100).toFixed(1);
    return { present, absent, late, percent, totalWorking };
  }, [activeStudent]);

  // Calculate monthly stats
  const monthlyStats = useMemo(() => {
    let present = 0, absent = 0, late = 0, totalWorking = 0;
    currentMonth.days.forEach(day => {
      if (day.status !== 'Upcoming') {
        totalWorking++;
        if (day.status === 'P') present++;
        else if (day.status === 'A') absent++;
        else if (day.status === 'L') late++;
      }
    });
    const percent = totalWorking === 0 ? 0 : (((present + late) / totalWorking) * 100).toFixed(1);
    return { present, absent, late, percent, totalWorking };
  }, [currentMonth]);

  const handleSaveRemark = () => {
    alert(`Remark saved for ${activeStudent.name}: ${remark}`);
    setRemark('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Student Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Click on any date to update attendance status. Changes save automatically.</p>
        </div>
        
        {/* Student Selector */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm flex items-center">
          <span className="text-sm font-medium text-gray-500 mr-3">Select Student:</span>
          <select 
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(Number(e.target.value))}
            className="bg-transparent text-sm font-bold text-indigo-700 focus:outline-none cursor-pointer"
          >
            {Object.keys(studentsData).map(id => (
              <option key={id} value={id}>
                {studentsData[id].name} ({studentsData[id].rollNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Yearly Overall</h3>
          <div className="flex items-end space-x-2">
            <span className={`text-3xl font-black ${yearlyStats.percent >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>{yearlyStats.percent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className={`${yearlyStats.percent >= 75 ? 'bg-emerald-500' : 'bg-rose-500'} h-1.5 rounded-full`} style={{ width: `${yearlyStats.percent}%` }}></div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-emerald-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Yearly Present</h3>
          <span className="text-3xl font-black text-emerald-600">{yearlyStats.present}</span>
        </div>

        <div className="bg-rose-50 rounded-2xl p-5 shadow-sm border border-rose-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">Yearly Absent</h3>
          <span className="text-3xl font-black text-rose-600">{yearlyStats.absent}</span>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 shadow-sm border border-amber-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Yearly Late</h3>
          <span className="text-3xl font-black text-amber-600">{yearlyStats.late}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Calendar Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 gap-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" /> Interactive Calendar
            </h2>
            
            <div className="flex items-center space-x-4 bg-white px-4 py-2 border border-gray-200 rounded-xl shadow-sm">
              <button onClick={handlePrevMonth} className="text-gray-400 hover:text-indigo-600 transition-colors p-1"><ChevronLeft className="h-5 w-5" /></button>
              <span className="font-bold text-gray-800 w-32 text-center">{currentMonth.monthName}</span>
              <button onClick={handleNextMonth} className="text-gray-400 hover:text-indigo-600 transition-colors p-1"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="p-6 flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {currentMonth.days.map((day, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer group ${getStatusStyles(day.status)}`}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent window click listener from closing it instantly
                    setEditingDate({ monthIdx: currentMonthIndex, dayIdx: index });
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{day.dayStr}</span>
                  <span className="text-3xl font-black mb-1">{day.date}</span>
                  <span className="text-xs font-bold tracking-widest uppercase">{getStatusLabel(day.status)}</span>
                  
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit3 className="h-4 w-4 opacity-50" />
                  </div>

                  {/* Popup Menu (Inside the box) */}
                  {editingDate?.monthIdx === currentMonthIndex && editingDate?.dayIdx === index && (
                    <div 
                      className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm shadow-inner rounded-xl p-1 flex flex-col justify-center gap-0.5 animate-in fade-in zoom-in-95 duration-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button onClick={() => { handleStatusChange(selectedStudentId, currentMonthIndex, index, 'P'); setEditingDate(null); }} className="w-full text-left px-2 py-1.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50 rounded transition-colors flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Present
                      </button>
                      <button onClick={() => { handleStatusChange(selectedStudentId, currentMonthIndex, index, 'A'); setEditingDate(null); }} className="w-full text-left px-2 py-1.5 text-[10px] font-bold text-rose-700 hover:bg-rose-50 rounded transition-colors flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span> Absent
                      </button>
                      <button onClick={() => { handleStatusChange(selectedStudentId, currentMonthIndex, index, 'L'); setEditingDate(null); }} className="w-full text-left px-2 py-1.5 text-[10px] font-bold text-amber-700 hover:bg-amber-50 rounded transition-colors flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Late
                      </button>
                      <button onClick={() => { handleStatusChange(selectedStudentId, currentMonthIndex, index, 'Upcoming'); setEditingDate(null); }} className="w-full text-left px-2 py-1 text-[10px] font-bold text-gray-700 hover:bg-gray-50 rounded mt-0.5 border-t border-gray-100 transition-colors flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white mr-1.5"></span> Clear
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-wrap gap-4 justify-center text-sm mt-auto">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span> Present</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-rose-500 mr-2"></span> Absent/Leave</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span> Late</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white mr-2"></span> Upcoming</div>
          </div>
        </div>

        {/* Monthly Summary & Remarks Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              {currentMonth.monthName} Summary
            </h2>
            
            <div className="space-y-6 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Working Days</span>
                <span className="text-lg font-bold text-gray-900">{monthlyStats.totalWorking}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">Present</span>
                </div>
                <span className="text-lg font-bold text-emerald-600">{monthlyStats.present}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-rose-500 mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">Absent/Leave</span>
                </div>
                <span className="text-lg font-bold text-rose-600">{monthlyStats.absent}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">Late</span>
                </div>
                <span className="text-lg font-bold text-amber-600">{monthlyStats.late}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">Monthly Attendance</h3>
              <div className="flex justify-center items-end space-x-1">
                <span className={`text-4xl font-black ${monthlyStats.percent >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {monthlyStats.percent}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              Teacher Remarks
            </h3>
            <textarea 
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder={`Add monthly remarks for ${activeStudent.name}...`}
              className="w-full border-gray-200 rounded-xl p-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[100px] mb-4 bg-gray-50/50"
            ></textarea>
            <button 
              onClick={handleSaveRemark}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center shadow-sm transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Remark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
