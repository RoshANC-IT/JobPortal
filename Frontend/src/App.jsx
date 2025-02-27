import './App.css';
import NavBar from './components/Shared/NavBar';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Job from './components/Jobs';
import Browser from "./components/Browser";
import Home from './components/Home';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';

// Admin routes
import Companies from './components/admin/Companies';
import CreateCompanies from './components/admin/CreateCompanies';
import CompanyId from './components/admin/CompanyIdSetup';
import Footer from './components/Shared/Footer';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from './components/admin/protected';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobs" element={<Job />} /> 
        <Route path="/browser" element={<Browser />} />
        <Route path='/description/:id' element={<JobDescription />} />
        <Route path='/Profile' element={<Profile />} />

        {/* Admin routes */}
        <Route path='/admin/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path='/admin/companies/create' element={<ProtectedRoute><CreateCompanies /></ProtectedRoute>} />
        <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanyId /></ProtectedRoute>} />
        <Route path="/admin/job" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path="/admin/job/create" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path='/admin/job/:id/applicants' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
