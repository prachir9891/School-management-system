import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import TeacherPanel from './pages/TeacherPanel';
import ParentPanel from './pages/ParentPanel';
import PrincipalPanel from './pages/PrincipalPanel';
import StudentPanel from './pages/StudentPanel';
import AccountantPanel from './pages/AccountantPanel';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherSubjects from './pages/teacher/TeacherSubjects';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherHomework from './pages/teacher/TeacherHomework';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherExams from './pages/teacher/TeacherExams';
import TeacherMarks from './pages/teacher/TeacherMarks';
import TeacherPerformance from './pages/teacher/TeacherPerformance';
import TeacherLeave from './pages/teacher/TeacherLeave';
import TeacherCommunication from './pages/teacher/TeacherCommunication';
import TeacherProfile from './pages/teacher/TeacherProfile';
import PrincipalTeachers from './pages/principal/PrincipalTeachers';
import PrincipalStudents from './pages/principal/PrincipalStudents';
import PrincipalAnalytics from './pages/principal/PrincipalAnalytics';
import PrincipalFees from './pages/principal/PrincipalFees';
import PrincipalNotices from './pages/principal/PrincipalNotices';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentHomework from './pages/student/StudentHomework';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentExams from './pages/student/StudentExams';
import StudentResults from './pages/student/StudentResults';
import StudentFees from './pages/student/StudentFees';
import StudentNotices from './pages/student/StudentNotices';
import StudentMaterial from './pages/student/StudentMaterial';
import StudentProfile from './pages/student/StudentProfile';
import AccountantCollection from './pages/accountant/AccountantCollection';
import AccountantStructure from './pages/accountant/AccountantStructure';
import AccountantPending from './pages/accountant/AccountantPending';
import AccountantReceipts from './pages/accountant/AccountantReceipts';
import AccountantDiscounts from './pages/accountant/AccountantDiscounts';
import AccountantHistory from './pages/accountant/AccountantHistory';
import AccountantReports from './pages/accountant/AccountantReports';
import AccountantTeacherSalary from './pages/accountant/AccountantTeacherSalary';
import ParentAttendance from './pages/parent/ParentAttendance';
import ParentHomework from './pages/parent/ParentHomework';
import ParentResults from './pages/parent/ParentResults';
import ParentExams from './pages/parent/ParentExams';
import ParentFees from './pages/parent/ParentFees';
import ParentRemarks from './pages/parent/ParentRemarks';
import ParentNotices from './pages/parent/ParentNotices';
import ParentLeave from './pages/parent/ParentLeave';
import ParentEvents from './pages/parent/ParentEvents';
import { ProtectedRoute } from './components/ProtectedRoute';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={`/${user.role.toLowerCase()}`} replace /> : <Login />} />
      
      <Route path="/" element={<Layout />}>
        {/* Admin Routes */}
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Teacher Routes */}
        <Route path="teacher" element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<TeacherPanel />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="subjects" element={<TeacherSubjects />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="homework" element={<TeacherHomework />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="exams" element={<TeacherExams />} />
          <Route path="marks" element={<TeacherMarks />} />
          <Route path="performance" element={<TeacherPerformance />} />
          <Route path="leave" element={<TeacherLeave />} />
          <Route path="communication" element={<TeacherCommunication />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>
        
        {/* Parent Routes */}
        <Route path="parent" element={
          <ProtectedRoute allowedRoles={['PARENT']}>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<ParentPanel />} />
          <Route path="attendance" element={<ParentAttendance />} />
          <Route path="homework" element={<ParentHomework />} />
          <Route path="results" element={<ParentResults />} />
          <Route path="exams" element={<ParentExams />} />
          <Route path="fees" element={<ParentFees />} />
          <Route path="remarks" element={<ParentRemarks />} />
          <Route path="notices" element={<ParentNotices />} />
          <Route path="leave" element={<ParentLeave />} />
          <Route path="events" element={<ParentEvents />} />
        </Route>

        {/* Principal Routes */}
        <Route path="principal" element={
          <ProtectedRoute allowedRoles={['PRINCIPAL']}>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<PrincipalPanel />} />
          <Route path="teachers" element={<PrincipalTeachers />} />
          <Route path="students" element={<PrincipalStudents />} />
          <Route path="analytics" element={<PrincipalAnalytics />} />
          <Route path="fees" element={<PrincipalFees />} />
          <Route path="notices" element={<PrincipalNotices />} />
        </Route>

        {/* Student Routes */}
        <Route path="student" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<StudentPanel />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="homework" element={<StudentHomework />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="exams" element={<StudentExams />} />
          <Route path="results" element={<StudentResults />} />
          <Route path="fees" element={<StudentFees />} />
          <Route path="notices" element={<StudentNotices />} />
          <Route path="material" element={<StudentMaterial />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Accountant Routes */}
        <Route path="accountant" element={
          <ProtectedRoute allowedRoles={['ACCOUNTANT']}>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<AccountantPanel />} />
          <Route path="collection" element={<AccountantCollection />} />
          <Route path="structure" element={<AccountantStructure />} />
          <Route path="pending" element={<AccountantPending />} />
          <Route path="receipts" element={<AccountantReceipts />} />
          <Route path="discounts" element={<AccountantDiscounts />} />
          <Route path="history" element={<AccountantHistory />} />
          <Route path="reports" element={<AccountantReports />} />
          <Route path="salary" element={<AccountantTeacherSalary />} />
        </Route>

        {/* Redirect based on role or to login */}
        <Route path="/" element={
          user ? <Navigate to={`/${user.role.toLowerCase()}`} replace /> : <Navigate to="/login" replace />
        } />
      </Route>

      <Route path="/unauthorized" element={
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
          <p className="text-lg text-gray-600 mb-6">You are not authorized to view this page.</p>
          <a href="/" className="text-indigo-600 hover:underline font-medium">Go back home</a>
        </div>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
