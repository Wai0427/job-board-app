import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ApplicantsList() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/jobs/${id}/applicants`);
        setApplicants(res.data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      }
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4">👀 Applicants for Job #{id}</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
        >
          ← Back
        </button>
      </div>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <ul className="space-y-4">
          {applicants.map((app) => (
            <li key={app.id} className="border p-3 rounded shadow">
              <p><strong>{app.applicant?.name || "Unknown"}</strong></p>
              <p className="text-gray-600">{app.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
