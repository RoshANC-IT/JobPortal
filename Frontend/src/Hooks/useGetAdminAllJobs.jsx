import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '@/components/redux/jobSlice';  // Correct the path if needed
import axios from 'axios'; // Import axios
import { JOB_API_END_POINT } from '@/utils/constant';  // Make sure this is defined

function useGetAdminAllJobs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));  // Dispatch jobs to Redux
        }
      } catch (error) {
        console.error('Error fetching admin jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error }; // Return loading and error states
}

export default useGetAdminAllJobs;
