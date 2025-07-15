// src/pages/JobList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/employer/jobs-with-applicants");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs with applicants count", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">📄 Published Jobs & Applicants</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
        >
          ← Back
        </button>
      </div>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No published jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-4 rounded bg-white shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-700">
                  👥 {job.applications_count} applicants
                </span>
                <button
                  onClick={() => navigate(`/employer/jobs/${job.id}/applicants`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Applicants
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
