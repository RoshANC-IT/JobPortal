import { useSelector } from "react-redux";
import Job from "./Job";
import FilterCard from "./FilterCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./index.css"
export default function About() {
  const { allJobs, searchJobQueryText } = useSelector((store) => store.job); // Use updated query from Redux
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchJobQueryText) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchJobQueryText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchJobQueryText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchJobQueryText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchJobQueryText]); // Depend on searchJobQueryText

  return (
    <div className="max-w-7xl mt-5 mx-auto ">
      <div className="flex gap-5">
        <div className="w-[20%]">
          <FilterCard />
        </div>
        {filterJobs.length === 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto p-1">
            <div className="grid grid-cols-3 gap-4">
              {filterJobs.map((job) => (

                <motion.div 
                initial={{ opacity: 0 , x: 100 }}
                animate={{ opacity: 1 , x:0}}
                exit={{ opacity:0,x:-100}}
                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.28, 0.96] }}
                
                key={job._id}>
                  <Job job={job} />
                </motion.div>
                
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
