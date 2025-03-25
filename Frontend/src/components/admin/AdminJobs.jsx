import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '../redux/jobSlice';  // Adjust import path if necessary
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input"; 
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminAllJobs from "@/Hooks/useGetAdminAllJobs";

const AdminJobs = () => {
  const [input, setInput] = useState("");  // For capturing the input search query
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useGetAdminAllJobs();  // Get job fetching status
  
  useEffect(() => {// Dispatch action to set search text in Redux
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]); // Re-run whenever the input changes

  return (
    <div>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">

          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}  // Capture input value
          />

          <Button onClick={() => navigate("/admin/job/create")}>New Jobs</Button>

        </div>

        {/* Loading and error handling */}
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <AdminJobsTable />}
      </div>
    </div>
  );
};

export default AdminJobs;
