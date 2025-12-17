import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPiUx7vdK-gSTR7pPtb-OeP-a4Uc7pnNiEVg&s"
            alt="Placeholder"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
