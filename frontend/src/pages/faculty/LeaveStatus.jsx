import React, { useState, useEffect } from "react";
import API from "../../services/api"; // adjust the path as needed

const LeaveStatus = () => {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch leave status from backend
  const fetchLeaves = async () => {
    try {
      const res = await API.get("/faculty/get-leaves"); // uses baseURL in API
      setLeaves(Array.isArray(res.data) ? res.data : res.data.leaves || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch leaves");
    }
  };

  // Fetch leaves when component mounts
  useEffect(() => {
    fetchLeaves();
  }, []);

  // Handle leave request form submission
  const handleLeaveRequest = async (e) => {
    e.preventDefault();

    if (!reason || !fromDate || !toDate) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await API.post("/faculty/post-leaves", {
        reason,
        fromDate,
        toDate,
      });
      setMessage(res.data.message);
      setReason("");
      setFromDate("");
      setToDate("");
      fetchLeaves(); // Refresh leave status
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to request leave");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Request Leave</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleLeaveRequest} className="mb-6 space-y-4">
        <div>
          <label className="block mb-1">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter leave reason"
          />
        </div>
        <div>
          <label className="block mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Request Leave
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Leave Status</h2>
      {leaves.length === 0 ? (
        <p>No leaves requested yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Reason</th>
              <th className="border px-2 py-1">From</th>
              <th className="border px-2 py-1">To</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="border px-2 py-1">{leave.reason}</td>
                <td className="border px-2 py-1">
                  {leave.fromDate.split("T")[0]}
                </td>
                <td className="border px-2 py-1">
                  {leave.toDate.split("T")[0]}
                </td>
                <td className="border px-2 py-1">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveStatus;
