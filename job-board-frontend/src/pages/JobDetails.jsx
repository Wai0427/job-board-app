import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error("Failed to load job", err));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(`/jobs/${id}/apply`, { message });
      setApplied(true);
    } catch (err) {
      console.error(err);
      setError("Failed to apply. You might have already applied or you're not an applicant.");
    }
  };

  if (!job) return <p className="p-6">Loading job...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.location} | {job.salary_range}</p>
      <p className="mt-4">{job.description}</p>

      <p className="mt-4 text-sm text-gray-500">
        Posted by: {job.employer?.name}
      </p>

      <hr className="my-6" />

      {applied ? (
        <p className="text-green-600">✅ You’ve successfully applied to this job!</p>
      ) : (
        <form onSubmit={handleApply} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <textarea
            placeholder="Why are you a good fit?"
            className="border w-full p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            📩 Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
