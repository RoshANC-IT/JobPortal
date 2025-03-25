/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
// import { useSelector } from "react-redux";
import "./index.css"
function Job({ job }) {
  const navigate = useNavigate();
  const dayAgoFunction = (mongoDBTime) => {
    if (!mongoDBTime) return "Unknown"; // Handle missing or invalid time
    const createdAt = new Date(mongoDBTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Handle edge cases for "today" and "just now"
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "1 Day Ago";
    return `${daysAgo} Days Ago`;
  };

  return (
    <div className="p-5 rounded-md shadow-xl  grid grid-cols-1 gap-4 ">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <p>{dayAgoFunction(job?.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon" aria-label="Save job for later">
          <Bookmark />
        </Button>
      </div>

      {/* Company and Avatar Section */}
      <div className="flex items-center my-2 gap-2">
        <Avatar>
          <AvatarImage
            src="https://static.vecteezy.com/system/resources/previews/015/280/523/non_2x/job-logo-icon-with-tie-image-free-vector.jpg"
            alt="Company logo"
          />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{job?.company?.name || "Unknown Company"}</h1>
          <p className="text-sm">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
        <p className="text-gray-400">{job?.description || "No description provided."}</p>
      </div>

      {/* Job Details Section */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className=" font-bold" variant="ghost">
          {job?.position || "Position"} Position
        </Badge>
        <Badge className=" font-bold" variant="ghost">
          {job?.jobType || "Full"} time
        </Badge>
        <Badge className=" font-bold" variant="ghost">
          {job?.salary || "0"} LPA
        </Badge>
      </div>

      {/* Action Buttons Section */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="rounded-xl text-teal-500"
          onClick={() => navigate(`/description/${job?._id}`)}
          aria-label="View job details"
        >
          Details
        </Button>
        <Button className="rounded-xl" aria-label="Save job for later">
          Save for Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
