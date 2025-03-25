import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function CompaniesTable() {
  const navigate = useNavigate();
  const { companies = [], searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies && companies.length > 0
        ? companies.filter((company) => {
            if (!searchCompanyByText) {
              return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
          })
        : []; // If no companies, fallback to empty array.

    // Only update if the filtered list has actually changed
    if (JSON.stringify(filteredCompany) !== JSON.stringify(filterCompany)) {
      setFilterCompany(filteredCompany);
    }
  }, [companies, searchCompanyByText, filterCompany]); // Add filterCompany as a dependency

  const companyList = Array.isArray(filterCompany) ? filterCompany : [];

  return (
    <div className="max-w-6xl my-10 mx-auto">
      <Table>
        <TableCaption>A list of your recent registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No Companies</TableCell>
            </TableRow>
          ) : (
            companyList.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      className="h-10 w-10"
                      src={
                        company.logo ||
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      }
                      alt="company-logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="bg-transparent">
                      <MoreHorizontal className="text-cyan-400"/>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="items-center flex gap-2 cursor-pointer -my-4 bg-gray-500 w-fit p-1"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <Edit2  className="w-4" />
                        <span>Edit</span>
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

export default CompaniesTable;
