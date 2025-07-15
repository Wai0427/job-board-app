import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name} 👋</h1>
        <p className="text-gray-700">
          You are logged in as: <strong className="capitalize">{user.role}</strong>
        </p>
      </div>

      {user.role === "employer" ? (
        <section className="bg-blue-50 p-6 rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Employer Dashboard</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>
              <Link to="/jobs/create" className="hover:underline">➕ Post a Job</Link>
            </li>
            <li>
              <Link to="/employer/jobs" className="hover:underline">🛠 Manage Your Jobs</Link>
            </li>
            <li>
              <Link to="/employer/applicants" className="hover:underline">👀 View Applicants</Link>
            </li>
          </ul>
        </section>
      ) : (
        <section className="bg-green-50 p-6 rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Applicant Dashboard</h2>
          <ul className="list-disc list-inside space-y-2 text-green-800">
            <li>
              <Link to="/jobs" className="hover:underline">🔍 Browse Available Jobs</Link>
            </li>
            <li>
              <Link to="/applications" className="hover:underline">📄 View Your Applications</Link>
            </li>
          </ul>
        </section>
      )}

      <div className="mt-6">
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
