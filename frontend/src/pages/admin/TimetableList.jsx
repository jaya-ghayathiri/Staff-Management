import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const TimetableList = () => {
  const [timetable, setTimetable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [form, setForm] = useState({
    faculty: "",
    course: "",
    day: "",
    time: "",
  });
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // ---------- Fetch Data ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tRes = await API.get("/admin/timetable");
        const cRes = await API.get("/admin/courses");
        const fRes = await API.get("/users/users"); // faculty users

        setTimetable(tRes.data);
        setCourses(cRes.data);
        setFaculty(fRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ---------- Create Timetable ----------
  const handleCreate = async () => {
    if (!form.faculty || !form.course || !form.day || !form.time) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/admin/timetable", form);
      setForm({ faculty: "", course: "", day: "", time: "" });

      // Refresh timetable
      const tRes = await API.get("/admin/timetable");
      setTimetable(tRes.data);
    } catch (err) {
      console.error("Error creating timetable:", err);
    }
  };

  // ---------- Delete Timetable ----------
  const handleDelete = async (id) => {
    if (window.confirm("Delete this timetable entry?")) {
      try {
        await API.delete(`/admin/timetable/${id}`);
        setTimetable(timetable.filter((t) => t._id !== id));
      } catch (err) {
        console.error("Error deleting timetable:", err);
      }
    }
  };

  // ---------- Helper Functions ----------
  const getFacultyName = (id) => {
    const f = faculty.find((f) => f._id === id);
    return f ? f.name : "Unknown";
  };

  const getCourseName = (id) => {
    const c = courses.find((c) => c._id === id);
    return c ? c.name : "Unknown";
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
      <h2 className="text-2xl font-bold mb-4">Timetable</h2>

      {/* Create Timetable Form */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <select
          className="border p-2"
          value={form.faculty}
          onChange={(e) => setForm({ ...form, faculty: e.target.value })}
        >
          <option value="">Select Faculty</option>
          {faculty.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
        >
          <option value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
        </select>

        <input
          type="text"
          className="border p-2"
          placeholder="10:00 - 11:00"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button
          className="bg-indigo-600 text-white px-4 rounded"
          onClick={handleCreate}
        >
          Add
        </button>
      </div>

      {/* Timetable Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th>Faculty</th>
            <th>Course</th>
            <th>Day</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timetable.length > 0 ? (
            timetable.map((t) => (
              <tr key={t._id} className="border-b text-center">
                <td>{t.faculty?.name || getFacultyName(t.faculty)}</td>
                <td>{t.course?.name || getCourseName(t.course)}</td>
                <td>{t.day}</td>
                <td>{t.time}</td>
                <td>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-gray-400">
                No timetable created yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>+
      </div>
    </div>
   
  );
};

export default TimetableList;
