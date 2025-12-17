import { Routes, Route } from "react-router-dom";
//auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
//admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import CoursesList from "./pages/admin/CoursesList";
import LeavesList from "./pages/admin/LeavesList";
import StudentsList from "./pages/admin/StudentsList";
import TimetableList from "./pages/admin/TimetableList";

// Faculty
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import Courses from "./pages/faculty/Courses";
import Timetable from "./pages/faculty/Timetable";
import Attendance from "./pages/faculty/Attendance";
import LeaveStatus from "./pages/faculty/LeaveStatus";
//protected routes
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/userslist" element={<UsersList />} />
        <Route path="/admin/courseslist" element={<CoursesList />} />
        <Route path="/admin/timetablelist" element={<TimetableList />} />
        <Route path="/admin/studentslist" element={<StudentsList />} />
        <Route path="/admin/leaveslist" element={<LeavesList />} />

        {/* Faculty */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/courses" element={<Courses />} />
        <Route path="/faculty/timetable" element={<Timetable />} />
        <Route path="/faculty/attendance" element={<Attendance />} />
        <Route path="/faculty/leave" element={<LeaveStatus />} />
      </Route>
    </Routes>
  );
}

export default App;
