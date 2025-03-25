import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setsingleCompany } from "../redux/companySlice";
import useGetCompanyById from "@/Hooks/useGetCompanyById";
import '../Notify/ToastifyCSS.css';
function CompanyIdSetup() {
  const { id } = useParams(); // Correct usage of useParams to get the id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Call useGetCompanyById to fetch the company data
  useGetCompanyById(id);  // Pass the id as an argument to the hook

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // Initialize the form with company data if available
  useEffect(() => {
    if (singleCompany && singleCompany._id === id) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany, id]);

  const handleEventChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files[0] });
    console.log("File selected:", e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("description", input.description);
    formdata.append("website", input.website);
    formdata.append("location", input.location);
    if (input.file) {
      formdata.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`, // Use the id from params
        formdata,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      setLoading(false);
      if (res.data.success) {
        toast.success(res.data.message,
          {
           className: "success"
          }
        );
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message || "Failed to update company.",
          {
            className:"error"
          }
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Axios error:", error.response);
      toast.error(error.response?.data.message || "An error occurred while updating the company.",
        {
          className:"error"
        }
      );
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex gap-2 items-center p-8">
            <Button onClick={() => navigate("/admin/companies")} className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft className="bg-black text-white" />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                placeholder="Enter your company name"
                className="my-2"
                name="name"
                value={input.name}
                onChange={handleEventChange}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Enter a brief company description"
                className="my-2"
                name="description"
                value={input.description}
                onChange={handleEventChange}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                placeholder="Enter your company website"
                className="my-2"
                name="website"
                value={input.website}
                onChange={handleEventChange}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                placeholder="Enter your company location"
                className="my-2"
                name="location"
                value={input.location}
                onChange={handleEventChange}
              />
            </div>
            
            <div>
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                className="my-2"
                name="file"
                onChange={handleFileChange}
              />
            </div>

          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CompanyIdSetup;
