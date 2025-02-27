import { useDispatch, useSelector } from "react-redux"
import Job from "./Job"
import { useEffect } from "react";
import { setSearchJobQueryText } from "./redux/jobSlice";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
export default function Browser() {
  useGetAllJobs();
  const dispatch= useDispatch();
  const { allJobs } = useSelector(store => store.job); // Correct state access
  useEffect(()=>{
    dispatch(setSearchJobQueryText(""))
  },[])

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h4 className="font-semibold">
        Search Result <span className="font-bold text-red-500">{allJobs.length}</span>
      </h4>
      <div className="grid-cols-3 gap-4 grid mt-5">
        {allJobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
