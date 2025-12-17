import { useState, useEffect } from "react";
import API from "../../services/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    const res = await API.get("/users/users");
    setUsers(res.data);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/users/users");
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await API.delete(`/users/users/${id}`);
      fetchUsers();
    }
  };

  // Open edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    });
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user
  const handleUpdate = async () => {
    await API.put(`/users/users/${selectedUser._id}`, formData);
    setSelectedUser(null);
    fetchUsers();
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
          <h2 className="text-2xl font-bold mb-4">Users</h2>

          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.department}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6 flex justify-center gap-4">
                    <FiEdit
                      className="cursor-pointer text-indigo-600"
                      onClick={() => handleEdit(user)}
                    />
                    <FiTrash2
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EDIT MODAL */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-bold mb-4">Edit User</h3>

                <input
                  className="w-full border p-2 mb-2"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  className="w-full border p-2 mb-2"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  className="w-full border p-2 mb-2"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                />

                <select
                  className="w-full border p-2 mb-4"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="staff">Staff</option>
                  <option value="faculty">Faculty</option>
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
