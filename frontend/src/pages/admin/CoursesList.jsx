import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", faculty: "" });

  const navigate = useNavigate();

  // ✅ Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/admin/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  // ✅ Fetch Faculty
  const fetchFaculty = async () => {
    try {
      const res = await API.get("/users/users");
      setFacultyList(res.data);
    } catch (err) {
      console.error("Error fetching faculty", err);
    }
  };

  // ✅ Correct useEffect
  useEffect(() => {
    fetchCourses();
    fetchFaculty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async () => {
    await API.post("/admin/courses", form);
    setForm({ name: "", code: "", faculty: "" });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete course?")) {
      await API.delete(`/admin/courses/${id}`);
      fetchCourses();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
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

        {/* Placeholder for charts or table */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Courses</h2>

          <div className="flex gap-2 mb-4">
            <input
              className="border p-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2"
              placeholder="Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />

            <select
              className="border p-2"
              value={form.faculty}
              onChange={(e) => setForm({ ...form, faculty: e.target.value })}
            >
              <option value="">Select Faculty</option>
              {facultyList.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
            </select>

            <button
              className="bg-indigo-600 text-white px-4"
              onClick={handleCreate}
            >
              Add
            </button>
          </div>

          <table className="w-full bg-white shadow">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Faculty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} className="border-b">
                  <td>{c.name}</td>
                  <td>{c.code}</td>
                  <td>{c.faculty?.name}</td>
                  <td>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
