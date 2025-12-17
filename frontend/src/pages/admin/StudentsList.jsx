import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });
 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/admin/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/admin/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  // Load data on page load (NO useEffect errors)
  useEffect(() => {
    const loadData = async () => {
      await fetchStudents();
      await fetchCourses();
    };

    loadData();
  }, []);

  // Create student
  const handleCreate = async () => {
    if (!form.name || !form.email || !form.course) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/admin/students", form);
      setForm({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (err) {
      console.error("Error creating student", err);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;

    try {
      await API.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link
            to="/admin/dashboard"
            className="hover:bg-indigo-500 p-2 rounded block"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/userslist"
            className="hover:bg-indigo-500 p-2 rounded block"
          >
            Users
          </Link>
          <Link
            to="/admin/courseslist"
            className="hover:bg-indigo-500 p-2 rounded block"
          >
            Courses
          </Link>
          <Link
            to="/admin/timetablelist"
            className="hover:bg-indigo-500 p-2 rounded block"
          >
            Timetable
          </Link>
          <Link
            to="/admin/studentslist"
            className="hover:bg-indigo-500 p-2 rounded block"
          >
            Students
          </Link>
          <Link
            to="/admin/leaveslist"
            className="hover:bg-indigo-500 p-2 rounded block"
          >
            Leaves
          </Link>
          <Link>
            <button
              className="hover:bg-indigo-500 p-2 rounded mt-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>

        {/* Stats Cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold">120</h2>
            </div>
            <img
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/users.png"
              alt="Users"
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500">Staff Count</p>
              <h2 className="text-2xl font-bold">50</h2>
            </div>
            <img
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/employee.png"
              alt="Staff"
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500">Faculty Count</p>
              <h2 className="text-2xl font-bold">30</h2>
            </div>
            <img
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/teacher.png"
              alt="Faculty"
            />
          </div>
        </div> */}

         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      {/* Create Student */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          className="border p-2"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>

        <button
          className="bg-indigo-600 text-white px-4 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>

      {/* Students Table */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Course</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{s.name}</td>
              <td className="py-2 px-4">{s.email}</td>
              <td className="py-2 px-4">
                {s.course?.name || "Not Assigned"}
              </td>
              <td className="py-2 px-4">
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      </div>
    </div>
   
  );
};

export default StudentsList;
