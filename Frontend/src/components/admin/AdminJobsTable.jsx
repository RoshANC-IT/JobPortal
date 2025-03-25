import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function AdminJobsTable() {
  const navigate = useNavigate();

  // Access search text and jobs from Redux
  const { searchJobByText, allAdminJobs } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs); // Initialize with the default value

  // Filter jobs based on search text
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true; // No filter applied if no search text
      return (
        job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJob(filteredJobs); // Update the filtered jobs list
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your Posted Jobs ({filterJob.length} job
          {filterJob.length !== 1 ? "s" : ""})
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { filterJob.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No Jobs</TableCell>
            </TableRow>
          ) : (
            filterJob.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right  ">
                  <Popover>
                    <PopoverTrigger className="bg-transparent">
                      <MoreHorizontal className="text-cyan-400" />
                    </PopoverTrigger>
                    <PopoverContent className="flex  items-center justify-center gap-5 -my-3 rounded-md bg-gray-500 w-full">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)} // go to the specific jobs 
                        className="flex items-center gap-2  cursor-pointer"
                      >
                        <Edit2 className="w-4 " />
                        <span>Edit</span>
                      </div>
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/job/${job._id}/applicants`)
                        }
                      >
                        <Eye className="w-4 " />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
