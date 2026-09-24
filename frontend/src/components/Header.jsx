import { useAuth } from '../context/AuthContext';
import { Bell, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center">
        <button className="text-gray-500 hover:text-gray-700 md:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden md:flex ml-4 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 transition-colors"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-indigo-600 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
        </button>
        {user?.role === 'STUDENT' ? (
          <Link to="/student/profile" className="flex items-center space-x-3 border-l border-gray-200 pl-6 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none mb-1">{user?.name}</p>
              <p className="text-xs font-medium text-indigo-600 capitalize leading-none">{user?.role?.toLowerCase()}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white overflow-hidden">
              {user?.studentDetails?.photoUrl ? (
                <img src={user.studentDetails.photoUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'U'
              )}
            </div>
          </Link>
        ) : user?.role === 'TEACHER' ? (
          <Link to="/teacher/profile" className="flex items-center space-x-3 border-l border-gray-200 pl-6 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none mb-1">{user?.name}</p>
              <p className="text-xs font-medium text-indigo-600 capitalize leading-none">{user?.role?.toLowerCase()}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white overflow-hidden">
              {user?.teacherDetails?.photoUrl ? (
                <img src={user.teacherDetails.photoUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'U'
              )}
            </div>
          </Link>
        ) : (
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none mb-1">{user?.name}</p>
              <p className="text-xs font-medium text-indigo-600 capitalize leading-none">{user?.role?.toLowerCase()}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
