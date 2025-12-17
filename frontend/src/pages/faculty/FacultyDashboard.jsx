// src/pages/faculty/Dashboard.jsx
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/faculty/courses"
          className="p-6 bg-indigo-600 text-white rounded-lg text-center shadow hover:bg-indigo-700 transition"
        >
          📚 Assigned Courses
        </Link>

        <Link
          to="/faculty/timetable"
          className="p-6 bg-indigo-600 text-white rounded-lg text-center shadow hover:bg-indigo-700 transition"
        >
          🕒 Timetable
        </Link>

        <Link
          to="/faculty/attendance"
          className="p-6 bg-indigo-600 text-white rounded-lg text-center shadow hover:bg-indigo-700 transition"
        >
          ✅ Attendance
        </Link>

        <Link
          to="/faculty/leave"
          className="p-6 bg-indigo-600 text-white rounded-lg text-center shadow hover:bg-indigo-700 transition"
        >
          📝 Leave Status
        </Link>
      </div>
    </div>
  );
};

export default FacultyDashboard;
