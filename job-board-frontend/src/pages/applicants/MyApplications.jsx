import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // import navigate
import api from "../../api/axios";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/applications/my")
      .then(res => setApplications(res.data))
      .catch(err => console.error("Error loading applications", err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📋 My Applications</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
        >
          ← Back
        </button>
      </div>

      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="border p-4 rounded bg-white shadow">
              <h2 className="font-semibold">{app.job?.title}</h2>
              <p className="text-gray-600">{app.job?.location} | {app.job?.salary_range}</p>
              <p className="mt-2 text-sm text-gray-700">
                Your message: {app.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
