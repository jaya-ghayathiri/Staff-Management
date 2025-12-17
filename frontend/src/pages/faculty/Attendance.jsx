import { useEffect, useState } from "react";
import API from "../../services/api";

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);

  // Load faculty assigned courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/faculty/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  // Load students when course changes
  useEffect(() => {
    if (!selectedCourse) return;

    const fetchStudents = async () => {
      try {
        const res = await API.get(`/faculty/students/${selectedCourse}`);

        // Add "present" flag dynamically
        const formatted = res.data.map((s) => ({
          _id: s._id,
          name: s.name,
          present: false,
        }));

        setStudents(formatted);
      } catch (err) {
        console.error("Error fetching students", err);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  const toggleStudent = (index) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handleMarkAttendance = async () => {
    if (!selectedCourse) return alert("Select a course");

    try {
      await API.post("/faculty/attendance", {
        course: selectedCourse,
        students,
      });

      alert("Attendance marked successfully");
    } catch (err) {
      console.error("Attendance error", err);
      alert("Failed to mark attendance");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

      {/* Course selector */}
      <select
        className="border p-2 mb-4"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name} ({c.code})
          </option>
        ))}
      </select>

      {/* Students list */}
      {students.length > 0 ? (
        <ul className="mb-4 space-y-2">
          {students.map((s, i) => (
            <li key={s._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={s.present}
                onChange={() => toggleStudent(i)}
              />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        selectedCourse && (
          <p className="text-gray-500 mb-4">
            No students enrolled for this course
          </p>
        )
      )}

      <button
        onClick={handleMarkAttendance}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default Attendance;
