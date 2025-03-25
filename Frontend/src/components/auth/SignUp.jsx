import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
// import { api } from "@/services/api";  // Import the axios instance
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../Notify/ToastifyCSS.css";

export default function SignUp() {
  const [inputHandle, setInputHandle] = useState({
    // creating a new input handle
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputHandle({ ...inputHandle, [e.target.name]: e.target.value });
  };


  // const handleFileUpload = (e) => {
  //   setInputHandle((prevState) => ({
  //     ...prevState,
  //     file: e.target.files[0],
  //   }));
  // };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (
      !inputHandle.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    ) {
      toast.error("Please enter a valid email address.", {
        className: "error",
      });
      setLoading(false);
      return;
    }

    if (inputHandle.password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        className: "error",
      });
      setLoading(false);
      return;
    }

    if (!inputHandle.role) {
      toast.error("Please select a role.", { className: "error" });
      setLoading(false);
      return;
    }

    const formData = new FormData(); // to form data 
    // It requires
    formData.append("email", inputHandle.email);
    formData.append("password", inputHandle.password);
    formData.append("role", inputHandle.role);

    // Optional fields
    if (inputHandle.fullname)    formData.append("fullname", inputHandle.fullname);
    if (inputHandle.phoneNumber) formData.append("phoneNumber", inputHandle.phoneNumber);
    if (inputHandle.file)        formData.append("profilePic", inputHandle.file);

    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, 
        formData, //formData send to USER_API_END_POINT 
        {
          
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log("Response:", response.data); // Debugging response

      if (response?.data?.success) {
        toast.success(`${response.data.message}`, { className: "success" });  // Updated success message with the available response structure
        navigate("/login"); // Redirect to login after successful registration
      } else {
        toast.error("Registration failed. Please try again.", {
          className: "error",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error); // Debugging error
      toast.error("An error occurred. Please try again.", {
        className: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto gap-2">
      <form
        onSubmit={submitHandler}
        className="w-1/2 shadow-2xl border-gray-100 rounded p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center  border-b">
          Sign Up
        </h1>

        {/* Full Name */}
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            onChange={handleChange}
            className="w-full outline-none border-none  bg-transparent"
            type="text"
            value={inputHandle.fullname}
            name="fullname"
            placeholder="Enter Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="my-2">
          <Label>Email</Label>
          <Input
            onChange={handleChange}
            type="email"
            className="w-full outline-none border-none  bg-transparent"
            value={inputHandle.email}
            name="email"
            placeholder="example@gmail.com"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            onChange={handleChange}
            type="tel"
            className="w-full outline-none border-none  bg-transparent"
            value={inputHandle.phoneNumber}
            name="phoneNumber"
            placeholder="9420111111"
            required
          />
        </div>

        {/* Password */}
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={inputHandle.password}
            name="password"
            onChange={handleChange}
            className="w-full outline-none border-none  bg-transparent"
            placeholder="Enter Your Password"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="my-2">
          <Label>Role</Label>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="student-option"
                name="role"
                value="student"
                checked={inputHandle.role === "student"}
                onChange={handleChange}
                className="h-5 w-5  outline-none border-none  bg-transparent"
              />
              <label
                htmlFor="student-option"
                className="text-lg  cursor-pointer"
              >
                Student
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="recruiter-option"
                name="role"
                value="recruiter"
                checked={inputHandle.role === "recruiter"}
                onChange={handleChange}
                className="h-5 w-5 "
              />
              <label
                htmlFor="recruiter-option"
                className="text-lg ] cursor-pointer"
              >
                Recruiter
              </label>
            </div>


            {/* File Input for Profile Picture */}
            {/* <div className="my-2">
              <Label>Profile Picture</Label>
              <Input
                type="file"
                onChange={handleFileUpload}
                name="file" // Change name to file
                required
              />
            </div> */}


          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full my-4 bg-red-600 hover:bg-red-400"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        {/* Login Link */}
        <span>
          Already have an account?{" "}
          <Link to="/login" className="text-[#6A38C2]">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
