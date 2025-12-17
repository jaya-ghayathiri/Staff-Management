import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await API.get("/admin/leaves");
    setLeaves(res.data);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await API.get("/admin/leaves");
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leaves", err);
      }
    };

    fetchLeaves();
  }, []);

  const handleStatus = async (id, status) => {
    await API.put(`/admin/leaves/${id}`, { status });
    fetchLeaves();
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
          <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6">Faculty</th>
                <th className="py-3 px-6">Reason</th>
                <th className="py-3 px-6">From</th>
                <th className="py-3 px-6">To</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l._id} className="border-b">
                  <td className="py-3 px-6">{l.faculty.name}</td>
                  <td className="py-3 px-6">{l.reason}</td>
                  <td className="py-3 px-6">
                    {new Date(l.fromDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(l.toDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{l.status}</td>
                  <td className="py-3 px-6 flex gap-2">
                    {l.status === "Pending" && (
                      <>
                        <button
                          className="px-2 py-1 bg-green-600 text-white rounded"
                          onClick={() => handleStatus(l._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-2 py-1 bg-red-600 text-white rounded"
                          onClick={() => handleStatus(l._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default LeavesList;
