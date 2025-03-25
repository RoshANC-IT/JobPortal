import  { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setsingleCompany } from "../redux/companySlice";
import '../Notify/ToastifyCSS.css';
function CreateCompanies() {
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const registerNewCompany = async () => {
    if (!companyName) {
      // eslint-disable-next-line no-undef
      toast.error("Please enter a company name."`${error.message}`,{className:"error"});
      return;
    }
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure that cookies (e.g., JWT token) are sent
        }
      );
      if (res.data.success) {
        dispatch(setsingleCompany(res.data.company)); // Dispatch company data to Redux store
        toast.success(res.data.message,{className:"success"});
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`); // Navigate to the created company page
      } else {
        toast.error(res.data.message || "Something went wrong!",{className:"error"});
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while creating company.",{className:"error"});
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto my-4">
        <div>
          <h1 className="font-semibold text-2xl">Your Company Name</h1>
          <p className="text-gray-400 font-semibold">What would you like to give your Company name</p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="Write your Company name"
          className="my-2"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
export default CreateCompanies;


// import { useState } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { COMPANY_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setsingleCompany } from "../redux/companySlice";

// function CreateCompanies() {
//   const [companyName, setCompanyName] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const registerNewCompany = async () => {
//     if (!companyName) {
//       toast.error("Please enter a company name.");
//       return;
//     }
//     try {
//       const res = await axios.post(`${COMPANY_API_END_POINT}/register`,
//         { companyName },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true, // Ensure that cookies (e.g., JWT token) are sent
//         }
//       );
//       if (res.data.success) {
//         dispatch(setsingleCompany(res.data.company)); // Dispatch company data to Redux store
//         toast.success(res.data.message);
//         const companyId = res?.data?.company?._id;
//         navigate(`/admin/companies/${companyId}`); // Navigate to the created company page
//       } else {
//         toast.error(res.data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error occurred while creating company.");
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto my-4">
//         <div>
//           <h1 className="font-semibold text-2xl">Your Company Name</h1>
//           <p className="text-gray-400 font-semibold">What would you like to give your Company name</p>
//         </div>
//         <Label>Company Name</Label>
//         <Input
//           type="text"
//           placeholder="Write your Company name"
//           className="my-2"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <div className="flex items-center gap-2 my-10">
//           <Button onClick={() => navigate("/admin/companies")}>Cancel</Button>
//           <Button onClick={registerNewCompany}>Continue</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateCompanies;
