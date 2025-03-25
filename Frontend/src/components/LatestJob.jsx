import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import "./index.css"

function LatestJob() {
  // Access the job slice from Redux store correctly
  const allJobs = useSelector((state) => state.job.allJobs) || []; // Fallback to an empty array
  // const job=[11,12,13,14,15,16,17,18,19]

  return (
    <div className="">
      <h1 className="text-4xl font-bold pl-5">
        <span className="text-[#d3453b]">Latest & Tops </span> Job Opening
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {/* Render job cards only if there are jobs */}
        {allJobs.length > 0 ? (
          allJobs.slice(0, 12).map((job) => (
            <LatestJobCards key={job._id}   job={job}/>
          ))
        ) : (
          <p>No jobs available.</p> // Fallback message if no jobs are available
        )}
      </div>
    </div>
  );
}

export default LatestJob;
