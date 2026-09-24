import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, LogOut, Settings, GraduationCap, TrendingUp, DollarSign, FileText, BookOpen, ClipboardList, PenTool, BarChart3, MessageSquare, ClipboardCheck, Clock, Receipt, CreditCard, PieChart, Bookmark, Wallet } from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = {
    ADMIN: [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ],
    TEACHER: [
      { name: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
      { name: 'My Classes', path: '/teacher/classes', icon: BookOpen },
      { name: 'My Syllabus', path: '/teacher/subjects', icon: Bookmark },
      { name: 'Attendance', path: '/teacher/attendance', icon: ClipboardCheck },
      { name: 'Homework', path: '/teacher/homework', icon: PenTool },
      { name: 'Assignments', path: '/teacher/assignments', icon: ClipboardList },
      { name: 'Exams', path: '/teacher/exams', icon: FileText },
      { name: 'Marks', path: '/teacher/marks', icon: BarChart3 },
      { name: 'Performance', path: '/teacher/performance', icon: TrendingUp },
      { name: 'Leave Requests', path: '/teacher/leave', icon: Calendar },
      { name: 'Parent Comm.', path: '/teacher/communication', icon: MessageSquare },
    ],
    STUDENT: [
      { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
      { name: 'Timetable', path: '/student/timetable', icon: Clock },
      { name: 'Attendance', path: '/student/attendance', icon: ClipboardCheck },
      { name: 'Homework', path: '/student/homework', icon: PenTool },
      { name: 'Assignments', path: '/student/assignments', icon: ClipboardList },
      { name: 'Exams', path: '/student/exams', icon: FileText },
      { name: 'Results', path: '/student/results', icon: BarChart3 },
      { name: 'Fees', path: '/student/fees', icon: DollarSign },
      { name: 'Notices', path: '/student/notices', icon: FileText },
      { name: 'Study Material', path: '/student/material', icon: BookOpen },
    ],
    PARENT: [
      { name: 'Dashboard', path: '/parent', icon: LayoutDashboard },
      { name: 'Attendance', path: '/parent/attendance', icon: ClipboardCheck },
      { name: 'Homework', path: '/parent/homework', icon: PenTool },
      { name: 'Results', path: '/parent/results', icon: BarChart3 },
      { name: 'Exam Schedule', path: '/parent/exams', icon: Clock },
      { name: 'Fee Status', path: '/parent/fees', icon: DollarSign },
      { name: 'Teacher Remarks', path: '/parent/remarks', icon: MessageSquare },
      { name: 'Notices', path: '/parent/notices', icon: FileText },
      { name: 'Leave Apps', path: '/parent/leave', icon: Calendar },
      { name: 'School Events', path: '/parent/events', icon: Calendar },
    ],
    PRINCIPAL: [
      { name: 'Overview', path: '/principal', icon: LayoutDashboard },
      { name: 'Teachers', path: '/principal/teachers', icon: Users },
      { name: 'Students', path: '/principal/students', icon: GraduationCap },
      { name: 'Analytics', path: '/principal/analytics', icon: TrendingUp },
      { name: 'Fees', path: '/principal/fees', icon: DollarSign },
      { name: 'Notices', path: '/principal/notices', icon: FileText },
    ],
    ACCOUNTANT: [
      { name: 'Dashboard', path: '/accountant', icon: LayoutDashboard },
      { name: 'Fee Collection', path: '/accountant/collection', icon: DollarSign },
      { name: 'Fee Structure', path: '/accountant/structure', icon: CreditCard },
      { name: 'Teacher Salary', path: '/accountant/salary', icon: Wallet },
      { name: 'Pending Fees', path: '/accountant/pending', icon: Clock },
      { name: 'Receipts', path: '/accountant/receipts', icon: Receipt },
      { name: 'Discounts', path: '/accountant/discounts', icon: TrendingUp },
      { name: 'Payment History', path: '/accountant/history', icon: FileText },
      { name: 'Financial Reports', path: '/accountant/reports', icon: PieChart },
    ],
  };

  const links = user ? navItems[user.role] : [];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
        <span className="text-xl font-bold text-gray-800 tracking-tight">EduManage</span>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {link.name}
            </NavLink>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
