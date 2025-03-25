import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';
import { api } from '@/services/api';


import '../Notify/ToastifyCSS.css';

export default function Login() {
  const [inputHandle, setInputHandle] = useState({
    email: "",
    password: "",
    role: "",     // Adding role field for selection
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setInputHandle({ ...inputHandle, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));


    if (!inputHandle.email || !inputHandle.password || !inputHandle.role) { // not required 
      toast.error("Please fill in all the required fields.",{className:"error"});
      dispatch(setLoading(false));
      return;
    }


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(inputHandle.email)) {
      toast.error("Please enter a valid email.",{className:"error"});
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await api.post(`${USER_API_END_POINT}/login`, {
        email: inputHandle.email,
        password: inputHandle.password,
        role: inputHandle.role, // Adding role to login request
      });

      if (response.data.success){
        localStorage.setItem("authToken", response.data.token);
        dispatch(setUser(response.data.user));
        toast.success(`Logged in successfully, ${response.data.user.username || response.data.user.fullname}!`,
          { 
            className:"success"
          }
      );
        navigate("/"); 
      } else {
        toast.error(response.data.message || "Invalid credentials.",{className:"error "} );
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred during login.",
        {className:"error"
      } 
    );  
    }  finally {
       dispatch(setLoading(false));
    }  
  };   


  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={submitHandler} className=" max-w-md w-1/2 shadow-2xl border-gray-100 rounded p-4 my-10">
        <h1 className="font-bold text-xl mb-5 text-center  border-b-2">Login</h1>
        <div className="my-3">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="example@gmail.com"
            value={inputHandle.email}
            onChange={handleChange}
            name="email"
            required
            className="w-full outline-none border-none  bg-transparent"
          />
        </div>

        <div className="my-3">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter Your Password"
            value={inputHandle.password}
            name="password"
            onChange={handleChange}
            required
            className="p-2 rounded w-full outline-none border-none  bg-transparent"
          />
        </div>

        {/* Role Selection */}
        <div className="my-3">
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
                className="h-5 w-5 "
              />
              <label htmlFor="student-option" className="text-lg text-blue-600 cursor-pointer">Student</label>
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
              <label htmlFor="recruiter-option" className="text-lg text-blue-600 cursor-pointer">Recruiter</label>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-4 w-full py-2 bg-red-600 hover:bg-red-400 focus:ring-2 focus:ring-red-500 text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center mt-3">
          <span>Don’t have an account?{" "}
            <Link to="/signup" className="text-[#6A38C2]">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
