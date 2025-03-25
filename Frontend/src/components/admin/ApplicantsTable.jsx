import React from "react";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

import '../Notify/ToastifyCSS.css';
const shortList = ['accepted', 'rejected'];
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const statushandler = async (status, id, e) => {
    e.preventDefault(); // Prevents any unwanted default behavior
    try {
      const response = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          className:"success"
        });
        window.location.reload();
      } else {
        toast.error(error.response?.data?.message || "An error occurred",         {
          className:"error"
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred",  {
       className:"error"
      });
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of your applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="bg-transparent">
                      <MoreHorizontal className="text-cyan-400"/>
                    </PopoverTrigger>
                    <PopoverContent className="flex justify-between w-60 h-10 items-center gap-2 bg-white/15 shadow-xl backdrop-blur-[2.4px] rounded-b-xl ">
                      {shortList.map((action, index) => (
                        <p
                          key={index}
                          className="cursor-pointer  "
                          onClick={(e) =>
                            statushandler(action.toLowerCase(), item?._id, e)
                          }
                        >
                          {action}
                        </p>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
