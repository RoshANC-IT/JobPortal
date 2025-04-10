import { useDispatch } from 'react-redux';
import { setcompanies } from '@/components/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';

function useGetAllCompany(companyId) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true }); // Fixed template literal
        if (res.data.success) {
          dispatch(setcompanies(res.data.companies)); // Dispatch company data to Redux store
        }
      } catch (error) {
        console.error(error); // Handle error gracefully
      }
    };
    fetchCompanies(); // Only run the effect once
  }, [dispatch]); // Make sure dispatch is included as a dependency

}

export default useGetAllCompany;
