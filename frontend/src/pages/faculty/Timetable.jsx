// src/pages/faculty/Timetable.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    API.get("/faculty/timetable")
      .then((res) => setTimetable(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Timetable</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-2 px-4">Day</th>
            <th className="py-2 px-4">Course</th>
            <th className="py-2 px-4">Time</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((t) => (
            <tr key={t._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{t.day}</td>
              <td className="py-2 px-4">{t.course}</td>
              <td className="py-2 px-4">{t.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
