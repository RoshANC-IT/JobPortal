import { useDispatch } from 'react-redux';
import { setsingleCompany } from '@/components/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';

function useGetCompanyById(companyId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setsingleCompany(res.data.company)); // Dispatch company data to Redux store
        }
      } catch (error) {
        console.error(error); // Handle error gracefully
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]); // Only run the effect when companyId changes
}

export default useGetCompanyById;
