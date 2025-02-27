import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/Hooks/useGetAllCompany";  // Assuming this hook fetches company data
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchCompanyByText } from "../redux/companySlice";
import { useState } from "react";
function Companies() {
  const [input, setInput]=useState("");
  const navigate = useNavigate();
  useGetAllCompany(); 
  const disptch=useDispatch();

  useEffect((e)=>{
    disptch(searchCompanyByText(input));
    
  })
  return (
    <div>
      <div className="max-w-6xl my-10 mx-auto">
        <div className="flex items-center justify-between my-5">
          <Input onChange={(e)=>setInput(e.target.value)} className={"w-fit"} placeholder="Filter by name" />
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add New Company
          </Button>
        </div>

        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}

export default Companies;
