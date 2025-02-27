import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../redux/applicationSlice';
import ApplicantsTable from './ApplicantsTable';

function Applicants() {
    const dispatch = useDispatch();
    const params = useParams();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (response.data.success) {
                    // Dispatching the applications array to the Redux store
                    dispatch(setAllApplicants(response.data.job.applications));
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);
    
    return (
        <div>
            <div className="max-w-7xl mx-auto">
                <h1 className="">
                    Applicants <sup className="text-red-500 font-bold">({applicants?.length || 0})</sup>
                </h1>
                <ApplicantsTable applicants={applicants} />
            </div>
        </div>
    );
}

export default Applicants;
