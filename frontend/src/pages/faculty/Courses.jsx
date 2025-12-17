// src/pages/faculty/Courses.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/faculty/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assigned Courses</h2>
      <ul className="space-y-2">
        {courses.map((c) => (
          <li
            key={c._id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <span>{c.name}</span>
            <span className="text-gray-500">{c.code}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
