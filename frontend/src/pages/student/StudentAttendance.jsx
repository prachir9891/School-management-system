import { useState, useMemo } from 'react';
import { Target, AlertCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, Umbrella } from 'lucide-react';

// Generate 12 months of realistic attendance data
const generateYearlyAttendance = () => {
  const months = [];
  const stats = { present: 0, absent: 0, late: 0, leave: 0, totalWorkingDays: 0 };
  
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

      stats.totalWorkingDays++;
      const rand = Math.random();
      let status = 'P';
      if (rand > 0.95) {
        status = 'A';
        stats.absent++;
      } else if (rand > 0.90) {
        status = 'L';
        stats.late++;
      } else if (rand > 0.85) {
        status = 'V';
        stats.leave++;
      } else {
        stats.present++;
      }

      days.push({
        date: d,
        dayStr: date.toLocaleString('default', { weekday: 'short' }),
        status
      });
    }

    months.push({ monthName, days });
  }

  // Treat 'Late' as partially present or just present for calculation depending on rules. 
  // Let's count Late as Present for the overall percentage, but track it separately.
  stats.percent = (((stats.present + stats.late) / stats.totalWorkingDays) * 100).toFixed(1);
  return { months, stats };
};

const attendanceData = generateYearlyAttendance();

export default function StudentAttendance() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const { months, stats } = attendanceData;

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
  };

  const currentMonth = months[currentMonthIndex];

  const getStatusStyles = (status) => {
    switch(status) {
      case 'P': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'A': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'L': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'V': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'P': return 'Present';
      case 'A': return 'Absent';
      case 'L': return 'Late';
      case 'V': return 'Leave';
      default: return 'Unknown';
    }
  };

  // Calculate monthly stats based on current month
  const monthlyStats = useMemo(() => {
    let present = 0, absent = 0, late = 0, leave = 0, totalWorking = 0;
    currentMonth.days.forEach(day => {
      totalWorking++;
      if (day.status === 'P') present++;
      else if (day.status === 'A') absent++;
      else if (day.status === 'L') late++;
      else if (day.status === 'V') leave++;
    });
    const percent = totalWorking === 0 ? 0 : (((present + late) / totalWorking) * 100).toFixed(1);
    return { present, absent, late, leave, percent, totalWorking };
  }, [currentMonth]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yearly Attendance Record</h1>
        <p className="text-sm text-gray-500 mt-1">Track your daily presence across the entire academic year.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center col-span-2 md:col-span-1">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Yearly Overall</h3>
          <div className="flex items-end space-x-2">
            <span className={`text-3xl font-black ${stats.percent >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>{stats.percent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className={`${stats.percent >= 75 ? 'bg-emerald-500' : 'bg-rose-500'} h-1.5 rounded-full`} style={{ width: `${stats.percent}%` }}></div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-5 shadow-sm border border-emerald-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Yearly Present</h3>
          <span className="text-3xl font-black text-emerald-600">{stats.present}</span>
        </div>

        <div className="bg-rose-50 rounded-2xl p-5 shadow-sm border border-rose-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">Yearly Absent</h3>
          <span className="text-3xl font-black text-rose-600">{stats.absent}</span>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 shadow-sm border border-amber-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Yearly Late</h3>
          <span className="text-3xl font-black text-amber-600">{stats.late}</span>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-5 shadow-sm border border-indigo-100 flex flex-col justify-center text-center">
          <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">Yearly Leave</h3>
          <span className="text-3xl font-black text-indigo-600">{stats.leave}</span>
        </div>
      </div>

      {stats.percent < 75 && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start shadow-sm">
          <AlertCircle className="h-5 w-5 text-rose-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-rose-900">Low Attendance Warning</h4>
            <p className="text-sm text-rose-700 mt-1">Your overall attendance is below the required 75%. Please ensure regular attendance to avoid academic penalties.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Calendar Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 gap-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" /> Monthly Record
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
                <div key={index} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:scale-105 ${getStatusStyles(day.status)}`}>
                  <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{day.dayStr}</span>
                  <span className="text-3xl font-black mb-1">{day.date}</span>
                  <span className="text-xs font-bold tracking-widest uppercase">{getStatusLabel(day.status)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-wrap gap-4 justify-center text-sm mt-auto">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span> Present</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-rose-500 mr-2"></span> Absent</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span> Late</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span> Leave</div>
          </div>
        </div>

        {/* Monthly Summary Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
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
                  <span className="text-sm font-medium text-gray-700">Absent</span>
                </div>
                <span className="text-lg font-bold text-rose-600">{monthlyStats.absent}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">Leave</span>
                </div>
                <span className="text-lg font-bold text-indigo-600">{monthlyStats.leave}</span>
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
        </div>
      </div>
    </div>
  );
}
