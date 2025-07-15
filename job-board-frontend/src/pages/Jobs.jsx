import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const navigate = useNavigate(); // 🚀 Initialize navigate

  useEffect(() => {
    api.get("/jobs")
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.salary_range.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [search, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📃 Available Jobs</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
        >
          ← Back
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by title, location, or salary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      {currentJobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {currentJobs.map((job) => (
            <li key={job.id} className="border p-4 rounded bg-white shadow">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.location} | {job.salary_range}</p>
              <p className="mt-2 text-sm">{job.description?.substring(0, 100)}...</p>
              <Link
                to={`/job/${job.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                🔍 View Details
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
