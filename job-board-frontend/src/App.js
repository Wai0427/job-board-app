import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import JobForm from './pages/JobForm';
import ApplicantsList from './pages/ApplicantsList';
import JobLists from './pages/JobLists';
import EmployerJobs from './pages/EmployerJobs';
import MyApplications from './pages/MyApplications';


// Wrapper to handle conditional redirect for '/', '/login'
function RedirectIfAuthenticated({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

// Wrapper for root '/' route
function RootRedirect() {
  const { user } = useContext(AuthContext);
  return <Navigate to={user ? "/dashboard" : "/login"} />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Root path (/) → redirect based on login */}
          <Route path="/" element={<RootRedirect />} />

          {/* Login */}
          <Route path="/login" element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          } />

          {/* Register/Dashboard */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

           {/* Applicant */}
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/job/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />

          {/* Employer */}
          <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />
          <Route path="/employer/applicants" element={<ProtectedRoute><JobLists /></ProtectedRoute>} />
          <Route path="/employer/jobs/:id/applicants" element={<ProtectedRoute><ApplicantsList /></ProtectedRoute>} />
          <Route path="/jobs/create" element={<ProtectedRoute><JobForm /></ProtectedRoute>} />
          <Route path="/jobs/edit/:id" element={<ProtectedRoute><JobForm isEdit={true} /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
