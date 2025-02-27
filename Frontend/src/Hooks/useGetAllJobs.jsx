import { useEffect, useRef } from 'react';
import { setAllJobs } from '@/components/redux/JobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

// Debounced effect hook to handle delayed API calls
const useDebouncedEffect = (callback, delay, dependencies) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [...dependencies, delay]);
};

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchJobQueryText } = useSelector(store => store.job);

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchJobQueryText}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs. Please try again.");
    }
  };

  // Use debounced effect to avoid frequent API calls on query change
  useDebouncedEffect(fetchAllJobs, 500, [searchJobQueryText, dispatch]);
}

export default useGetAllJobs;
